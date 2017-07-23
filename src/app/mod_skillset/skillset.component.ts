import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms'
import { Associate } from '../com_entities/entities';
import { CurrentUserSvc } from '../com_services/currentuser.svc';

@Component({
  moduleId: module.id,
  selector: 'skillset',
  templateUrl: 'skillset.component.html',
})

export class SkillSetComponent {
  currentUser: string;
  skillsetFrm: FormGroup;
  acs: Associate;
  departments: any;
  locations: any;
  dateToday: Date;
  //new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  constructor(
      private curUserSvc: CurrentUserSvc,
      fb: FormBuilder){
    this.skillsetFrm = fb.group({
      'UserName': [''],
      'Department': [1],
      'Location': [1],
      'VPN': [false],
      'PhoneNumber': ['',Validators.maxLength(20)],
      'UpdatedOn': [{value: new Date(), readonly: true}]
    });
  }
  
  //TEMPLATE: this will get all needed data
  async getDependencies() {
    await this.curUserSvc.getCurrentUser().then(user=>this.currentUser = user.UserName);
  }

  ngOnInit():void {
    this.getDependencies();
    this.dateToday = new Date();
    this.acs = new Associate(
      0,
      "rty",
      "",
      true,
      2,
      3,
      this.dateToday,
      false
    );


    this. departments = [
       {id: 1, name: "Admin"},
       {id: 2, name: "Marketing"},
       {id: 3, name: "Sales"}
     ];

     this.locations = [
       {id: 1, name: "New York"},
       {id: 2, name: "Los Angeles"},
       {id: 3, name: "Houston"}
     ];
    
}

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
    //this.testData = this.skillsetForm.controls.sku.value;

  }
}
