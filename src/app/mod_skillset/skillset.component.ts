import { Component } from '@angular/core';
import { UserManagement } from '../com_data/usermanagement';
@Component({
  selector: 'skillset',
  templateUrl: 'skillset.component.html',
})
export class SkillSetComponent {
  constructor(private userManagement: UserManagement){

  }
  strUser:string;

  getUser(){
    this.userManagement.getUsers().then(
      userString => this.strUser = userString
    ).catch(
      ()=>{
        console.log("may mali dito");
      }
    );
  }
}
