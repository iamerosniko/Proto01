import { Component } from '@angular/core';
import { DepartmentSvc } from '../../com_services/department.svc';
import { Department } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-dept',
  templateUrl: 'vw_department.component.html',
})
export class VWDepartmentComponent {
  constructor(private deptSvc:DepartmentSvc){
    this.getLocations();
  }
  viewMode : number = 0;
  department : Department = new Department(0,'',true);
  departments: Department[] = [];

  newDetails(){
    this.department=new Department(0,'',true);
  }

  editDetails(dept: Department){
    this.viewMode=1;
    //get detail
    this.getDetails(dept);
  }
  getDetails(dept : Department){
    this.department = dept;
  }

  async saveDepartment(){
    this.viewMode==0 ?  await this.deptSvc.postDepartment(this.department) : await this.deptSvc.putDepartment(this.department);
    alert("yes");
    document.getElementById("btnGoBack").click();
    this.getLocations();
    this.department=new Department(0,'',true);
  }

  async getLocations(){
    this.departments=await this.deptSvc.getDepartments();
  }
}
