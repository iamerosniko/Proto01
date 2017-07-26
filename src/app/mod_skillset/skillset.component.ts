import { 
  Component, 
  OnInit 
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms'
import {
  Associate,
  Set_User,
  Location,
  Department
} from '../com_entities/entities';
import { CurrentUserSvc } from '../com_services/currentuser.svc';
import { Set_UserSvc } from '../com_services/set_user.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { LocationSvc } from '../com_services/location.svc';
import { DepartmentSvc } from '../com_services/department.svc';

@Component({
  moduleId: module.id,
  selector: 'skillset',
  templateUrl: 'skillset.component.html',
})

export class SkillSetComponent {
  private dateToday: Date;
  private currentUser: any;
  private currentUserFullname: string;
  private associate: Associate;
  private user: Set_User;
  private locations: Location[];
  private departments: Department[];
  private skillsetFrm: FormGroup;
  private trueForm: any;
  //new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  
  constructor(
      private curUserSvc: CurrentUserSvc,
      private useSvc: Set_UserSvc,
      private assSvc: AssociateSvc,
      private locSvc: LocationSvc,
      private depSvc: DepartmentSvc,
      private fb: FormBuilder){
        
    this.skillsetFrm = this.fb.group({
      'UserName': [' '],
      'Department': [1],
      'Location': [1],
      'VPN': [false],
      'PhoneNumber': [' ',Validators.maxLength(20)],
      'UpdatedOn': [' ']
      //<!--value="{{dateToday | date: 'dd/MM/yyyy'}}"/>-->
    });
  }
  
  //TEMPLATE: this will get all needed data
  async getDependencies() {
    this.currentUser = await this.curUserSvc.getCurrentUser();
    this.locations = await this.locSvc.getLocations();
    this.departments = await this.depSvc.getDepartments();
  }
 
  //this will get info of current user
  async getCurrentUserData() {
    let associates = await this.assSvc.getAssociates();
    this.associate = await associates.find(associate => associate.UserName == this.currentUser.UserName);
    let users = await this.useSvc.getSet_Users();
    this.user = await users.find(user => user.user_name == this.currentUser.UserName);
  }

  //TEMPLATE: this will run functions in order
  async runFunctions() {
    await this.getDependencies();
    await this.getCurrentUserData();
  }
  ngOnInit(): void {
    this.dateToday = new Date();
    this.associate = new Associate(
      0,
      ' ',
      ' ',
      false,
      0,
      0,
      new Date(),
      false
    );

    this.runFunctions();
    
}

  onSubmit(form: any): void {
    //console.log('you submitted value:', form);
    //this.testData = this.skillsetForm.controls.sku.value;
    this.trueForm = form;

  }
}
