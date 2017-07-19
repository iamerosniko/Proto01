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
    this.getDepartments();
  }
  viewMode : number = 0;
  department : Department = new Department(0,'',true);
  departments: Department[] = [];
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

  goBack(){
    this.mode=0;
  }

  async saveDepartment(){
    this.viewMode==0 ?  await this.deptSvc.postDepartment(this.department) : await this.deptSvc.putDepartment(this.department);
    document.getElementById("btnGoBack").click();
    this.getDepartments();
    this.department=new Department(0,'',true);
    this.goBack();
  }

  async getDepartments(){
    this.departments=await this.deptSvc.getDepartments();
  }
}
