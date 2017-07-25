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
  Location,
  Department
} from '../com_entities/entities';
import { CurrentUserSvc } from '../com_services/currentuser.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { LocationSvc } from '../com_services/location.svc';
import { DepartmentSvc } from '../com_services/department.svc';

@Component({
  moduleId: module.id,
  selector: 'skillset',
  templateUrl: 'skillset.component.html',
})

export class SkillSetComponent {
  private currentUser: any;
  private associate: Associate;
  private associates: Associate[];
  private locations: Location[];
  private departments: Department[];
  private skillsetFrm: FormGroup;
  private trueForm: any;

  dateToday: Date;
  //new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  constructor(
      private curUserSvc: CurrentUserSvc,
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
  }
  
  //TEMPLATE: this will get all needed data
  async getDependencies() {
    this.currentUser = await this.curUserSvc.getCurrentUser();
    this.associates = await this.assSvc.getAssociates();
    this.locations = await this.locSvc.getLocations();
    this.departments = await this.depSvc.getDepartments();
  }
 
  //this will get info of current user
  async getCurrentUserData() {
    this.associate = await this.associates.find(associate => associate.UserName == this.currentUser.UserName);
    this.associates = await null;
  }

  ngOnInit(): void {
    this.getDependencies().then(() => {
      this.getCurrentUserData();
    });
    // this.getDependencies();
    // this.getCurrentUserData();
    //this.createForm();
    
    
    
    //this.currentUser = "bermoy";
    // this.associate = new Associate(
    //   0,
    //   "rty",
    //   "",
    //   true,
    //   2,
    //   3,
    //   this.dateToday,
    //   false
    // );

    // this.associates = [
    //   {AssociateID: 1,
    //   UserName: "bermoy",
    //   PhoneNumber: " ",
    //   VPN: true,
    //   DepartmentID: 1,
    //   LocationID: 1,
    //   UpdatedOn: this.dateToday,
    //   IsActive: true},
    //   {AssociateID: 1,
    //   UserName: "sarmife",
    //   PhoneNumber: " ",
    //   VPN: true,
    //   DepartmentID: 1,
    //   LocationID: 1,
    //   UpdatedOn: this.dateToday,
    //   IsActive: true},
    //   {AssociateID: 1,
    //   UserName: "albert",
    //   PhoneNumber: " ",
    //   VPN: true,
    //   DepartmentID: 1,
    //   LocationID: 1,
    //   UpdatedOn: this.dateToday,
    //   IsActive: true}
    
    // ];
}

  onSubmit(form: any): void {
    //console.log('you submitted value:', form);
    //this.testData = this.skillsetForm.controls.sku.value;
    this.trueForm = form;

  }
}
