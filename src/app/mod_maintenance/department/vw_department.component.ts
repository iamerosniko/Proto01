import { Component } from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'vw-dept',
  templateUrl: 'vw_department.component.html',
})
export class VWDepartmentComponent {
  constructor(){

  }
  viewMode : number = 0;
  editDetails(){
    this.viewMode=1;
    //get detail
  }
}
