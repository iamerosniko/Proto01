import { Component } from '@angular/core';
import { DepartmentSvc } from '../../com_services/department.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { Department,DepartmentSkillsets } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-dept',
  templateUrl: 'vw_department.component.html',
})
export class VWDepartmentComponent {
  constructor(private deptSvc:DepartmentSvc,
    private departmentSkillsetSvc:DepartmentSkillsetsSvc){
    this.goBack();
  }
  viewMode : number = 0;
  department : Department = new Department(0,'',true);
  departments: Department[] = [];
  departmentSkillsets:DepartmentSkillsets[]=[];
  mode:number=0;
  newDetails(){
    this.department=new Department(0,'',true);
  }

  editDetails(dept: Department){
    this.viewMode=1;
    //get detail
    this.mode=1;
    this.getDetails(dept);
  }

  getDetails(dept : Department){
    this.department = dept;
  }

  getStatus(status:boolean):string{
    return status ? "Yes" : "No";
  }

  changeStatus(dept:Department){
    this.getDetails(dept);
    this.viewMode=1;
    this.department.IsActive=false;
    this.deleteAssociatedToDepartmentSkillset(dept.DepartmentID);
    this.saveDepartment();
  }

  async deleteAssociatedToDepartmentSkillset(deptID:number){
    this.departmentSkillsets=this.departmentSkillsets.filter(x=>x.DepartmentID==deptID);
    console.log(this.departmentSkillsets);
    for(var i = 0 ; i<this.departmentSkillsets.length ;i++)
    {
      var deptSkillset=this.departmentSkillsets[i];
      await this.departmentSkillsetSvc.DeleteDepartmentSkillset(deptSkillset.DepartmentSkillsetID);
    }
    console.log('done');
  }


  goBack(){
    this.mode=0;
    this.getDepartments();
    this.department=new Department(0,'',true);
  }

  async saveDepartment(){
    if(this.entryValidation()){
      this.viewMode==0 ?
        ( 
          await this.deptSvc.postDepartment(this.department),
          alert("New Record has been successfully added.") 
        ) :
        ( 
          await this.deptSvc.putDepartment(this.department),
          alert("Record has been successfully updated.")
        );
      
      document.getElementById("btnGoBack").click();
      this.goBack();
    }
  }
  entryValidation():boolean{
    var msg='';
    this.department.DepartmentDescr.trim()=='' ? msg+='Department Description is Required.\n' : null ;
    return msg==''?(true):(alert(msg),false);
  }



  async getDepartments(){
    this.departments=await this.deptSvc.getDepartments();
  }
}
