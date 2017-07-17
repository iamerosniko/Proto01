import { Component } from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'vw-skillset',
  templateUrl: 'vw_skillset.component.html',
})
export class VWSkillsetComponent {
  constructor(){

  }
  viewMode : number = 0;
  editDetails(){
    this.viewMode=1;
    //get detail
  }
}
