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
  checkallValue:boolean;
  tempDeptSkill:DepartmentSkillsets
  selectedDepartmentID:number;
  departments: Department[] = [];
  departmentSkillsets:DepartmentSkillsets[]=[];
  skillsets: Skillset[]=[];
  selectedSkillsets:SelectedSkillset[]=[];
  //step1
  async getDepartments(){
    this.departments=await this.deptSvc.getDepartments();
    this.departments= this.departments.filter(x=>x.IsActive==true);
  }
  //step2
  async getSkillSets(deptID:number){
    //reset checkall
    this.checkallValue=false;
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
    this.getDepartmentSkillsets(deptID).then(()=>{
      this.compareSelectedSkillsets();
    });
  }
  //step3
  async getDepartmentSkillsets(deptID:number){
    this.departmentSkillsets = await this.departmentSkillsetSvc.getDepartmentSkillsets();
    this.departmentSkillsets = this.departmentSkillsets.filter(ds=>ds.DepartmentID==deptID);
  }
  //step 4
  async compareSelectedSkillsets(){

    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
        this.tempDeptSkill= await this.departmentSkillsets.find(ds=>
        ds.SkillsetID==selectedSkillset.departmentSkillset.SkillsetID);
      if (this.tempDeptSkill!=null){
        selectedSkillset.IsSelected=true;
      } 
    }
  }

  checkAllSkills(isChecked:boolean){
    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
      selectedSkillset.IsSelected=isChecked;
    }
  }

  async saveDepartmentSkillset(){
    //delete all departmentSkillsets
    for (var i = 0; i < this.departmentSkillsets.length; i++){
      var departmentSkillset=this.departmentSkillsets[i];
      await this.departmentSkillsetSvc.DeleteDepartmentSkillset(departmentSkillset.DepartmentSkillsetID);
    }

    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
      if(selectedSkillset.IsSelected==true){
        await this.departmentSkillsetSvc.postDepartmentSkillset(selectedSkillset.departmentSkillset);
      }
    }
  }
}
