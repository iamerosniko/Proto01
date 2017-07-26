import { Component } from '@angular/core';
import { DepartmentSvc } from '../../com_services/department.svc';
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { Department,Skillset,DepartmentSkillsets,SelectedSkillset } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-dept',
  templateUrl: 'vw_department_skills.component.html',
})
export class VWDepartmentSkillsComponent {
  constructor(
    private deptSvc:DepartmentSvc,
    private skillsetSvc:SkillsetSvc,
    private departmentSkillsetSvc:DepartmentSkillsetsSvc
  ){
    this.getDepartments();
  }
  //department combobox
  departments: Department[] = [];
  departmentSkillsets:DepartmentSkillsets[]=[];
  skillsets: Skillset[]=[];
  selectedSkillsets:any[]=[];
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
    // for (let skill in this.skillsets){
    //   this.selectedSkillsets.push(
    //     new SelectedSkillset(
          
    //     )
    //   )
    // }

    ////
  }
  //step3
  async getDepartmentSkillsets(deptID:number){
    this.departmentSkillsets = await this.departmentSkillsetSvc.getDepartmentSkillsets();
  }
  //step 4
  async compareSelectedSkillsets(){
  }

  // newDetails(){
  //   this.department=new Department(0,'',true);
  // }

  // editDetails(dept: Department){
  //   this.viewMode=1;
  //   //get detail
  //   this.mode=1;
  //   this.getDetails(dept);
  // }

  // getDetails(dept : Department){
  //   this.department = dept;
  // }

  // goBack(){
  //   this.mode=0;
  // }



  async saveDepartment(){
    // this.viewMode==0 ?  await this.deptSvc.postDepartment(this.department) : await this.deptSvc.putDepartment(this.department);
    // document.getElementById("btnGoBack").click();
    // this.getDepartments();
    // this.department=new Department(0,'',true);
    // this.goBack();
  }

}
