import { Component,OnInit } from '@angular/core';
import { DepartmentSvc } from '../../com_services/department.svc';
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { Department,Skillset,DepartmentSkillsets,SelectedSkillset } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-dept',
  templateUrl: 'vw_department_skills.component.html',
})
export class VWDepartmentSkillsComponent implements OnInit {
  constructor(
    private deptSvc:DepartmentSvc,
    private skillsetSvc:SkillsetSvc,
    private departmentSkillsetSvc:DepartmentSkillsetsSvc
  ){
    this.getDepartments();
  }
  ngOnInit(){
    this.getDepartments();
  }
  //department combobox
  selectedDepartmentID:number;
  departments: Department[] = [];
  departmentSkillsets:DepartmentSkillsets[]=[];
  skillsets: Skillset[]=[];
  selectedSkillsets:SelectedSkillset[]=[];
  //step1
  async getDepartments(){
    this.departments=await this.deptSvc.getDepartments();
  }
  //step2
  async getSkillSets(deptID:number){
    //1. get skillsets
    this.skillsets=await this.skillsetSvc.getSkillsets();
    //clears the checkboxes
    this.selectedSkillsets=[];
    //2. loop skillsets to custom array
    for (var i = 0 ; i<this.skillsets.length; i++){
      this.selectedSkillsets.push(
        new SelectedSkillset( 
          new DepartmentSkillsets(0,deptID,this.skillsets[i].SkillsetID)
          ,false
          ,this.skillsets[i].SkillsetDescr
        )
      )
    }
  }
  //step3
  async getDepartmentSkillsets(deptID:number){
    this.departmentSkillsets = await this.departmentSkillsetSvc.getDepartmentSkillsets();
  }
  //step 4
  async compareSelectedSkillsets(){

    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
      var deptSkill = this.departmentSkillsets.find(ds=>
        ds.DepartmentSkillsetID==selectedSkillset.departmentSkillset.DepartmentSkillsetID);
      console.log(deptSkill);  
      if (deptSkill!=null){
        selectedSkillset.IsSelected=true;
      } 
    }
  }

  checkAllSkills(){
    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
      selectedSkillset.IsSelected=true;
    }
  }

}
