import { 
  Component, 
  OnInit ,
  ChangeDetectorRef
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators,
  AbstractControl,
  FormControl
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
  private associate: Associate;
  private associateForPosting: Associate;
  private user: Set_User;
  private locations: Location[];
  private departments: Department[];
  private skillsetFrm: FormGroup;
  testVal: any;
  checkBox1: any;
  constructor(
      private curUserSvc: CurrentUserSvc,
      private useSvc: Set_UserSvc,
      private assSvc: AssociateSvc,
      private locSvc: LocationSvc,
      private depSvc: DepartmentSvc,
      private fb: FormBuilder,
      private ref:ChangeDetectorRef){
        
    this.skillsetFrm = this.fb.group({
      'UserName': [' '],
      'Department': [1],
      'Location': [1],
      'VPN': [false],
      'PhoneNumber': [' ',Validators.maxLength(20)],
      'UpdatedOn': [' ']
      //<!--value="{{dateToday | date: 'dd/MM/yyyy'}}"/>-->
    });
    let checkBox1 = new FormControl();
    this.skillsetFrm.addControl('checkBox1', checkBox1);
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
    this.associateForPosting = await JSON.parse(JSON.stringify(this.associate));
    this.associate.UserName =  await this.user.user_first_name + ' ' + this.user.user_last_name;
  }

  //TEMPLATE: memory clean up
  cleanUp(): void {
      this.curUserSvc = null;
      this.useSvc = null;
      this.locSvc = null;
      this.depSvc = null;
  }

  //TEMPLATE: this will run functions in order
  async runFunctions() {
    await this.getDependencies();
    await this.getCurrentUserData();
    await this.cleanUp();
  }

  //this will assign values to the object to be saved
  async assignValues(formData: any) {
    this.associateForPosting.DepartmentID = await formData.Department;
    this.associateForPosting.LocationID = await formData.Location;
    this.associateForPosting.VPN = await formData.VPN;
    this.associateForPosting.PhoneNumber = await formData.PhoneNumber;
    this.associateForPosting.UpdatedOn = await new Date(this.dateToday.setHours(-4));
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


    //allfunctions here are for test
    // this.testVal = this.skillsetFrm.controls;
    // this.setMockValues();
}

  async onSubmit(formData: any) {
    alert('Your record has been updated.')
    console.log('you submitted value:', formData);
    await this.assignValues(formData);
    await this.assSvc.putAssociate(this.associateForPosting);
  }

  setMockValues(): void {
    this.departments =[
      new Department(
        1,
        'Admin',
        true
      ),
      new Department(
        2,
        'Sales',
        true
      ),
      new Department(
        3,
        'Support',
        true
      )
    ];
  }
}
