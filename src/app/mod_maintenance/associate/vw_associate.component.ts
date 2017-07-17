import { Component } from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'vw-asssoc',
  templateUrl: 'vw_associate.component.html',
})
export class VWAssociateComponent {
  constructor(){

  }
  viewMode : number = 0;

  editDetails(){
    this.viewMode=1;
    //get detail
  }
}
