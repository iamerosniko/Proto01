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
  private currentUser: string;
  private associate: Associate;
  private associates: Associate[];
  private locations: Location[];
  private departments: Department[];
  


  skillsetFrm: FormGroup;
  acs: Associate;
  dateToday: Date;
  
  //new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
  constructor(
      private curUserSvc: CurrentUserSvc,
      private assSvc: AssociateSvc,
      private locSvc: LocationSvc,
      private depSvc: DepartmentSvc,
      fb: FormBuilder){
      
    this.skillsetFrm = fb.group({
      'UserName': [''],
      'Department': [1],
      'Location': [1],
      'VPN': [false],
      'PhoneNumber': ['',Validators.maxLength(20)],
      'UpdatedOn': ['']
      //<!--value="{{dateToday | date: 'dd/MM/yyyy'}}"/>-->
    });
  }
  
  //TEMPLATE: this will get all needed data
  getDependencies(): void {
    //this.curUserSvc.getCurrentUser().then(user => this.currentUser = user.UserName);
    //this.assSvc.getAssociates().then(associates => this.associates = associates);
    //this.locSvc.getLocations().then(locations => this.locations = locations);
    //this.depSvc.getDepartments().then(departments => this.departments = departments);
    
  }
 
  getAssData(): void {
    this.associate =  this.associates.find(associate => associate.UserName == this.currentUser);
  }
  async ngOnInit() {
    this.getDependencies();
    
    this.currentUser = "bermoy";
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

    this.associates = [
      {AssociateID: 1,
      UserName: "bermoy",
      PhoneNumber: " ",
      VPN: true,
      DepartmentID: 1,
      LocationID: 1,
      UpdatedOn: this.dateToday,
      IsActive: true},
      {AssociateID: 1,
      UserName: "sarmife",
      PhoneNumber: " ",
      VPN: true,
      DepartmentID: 1,
      LocationID: 1,
      UpdatedOn: this.dateToday,
      IsActive: true},
      {AssociateID: 1,
      UserName: "albert",
      PhoneNumber: " ",
      VPN: true,
      DepartmentID: 1,
      LocationID: 1,
      UpdatedOn: this.dateToday,
      IsActive: true}
    
    ];

  await this.getAssData();

    // this. departments = [
    //    {id: 1, name: "Admin"},
    //    {id: 2, name: "Marketing"},
    //    {id: 3, name: "Sales"}
    //  ];

    //  this.locations = [
    //    {id: 1, name: "New York"},
    //    {id: 2, name: "Los Angeles"},
    //    {id: 3, name: "Houston"}
    //  ];
    
}

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
    //this.testData = this.skillsetForm.controls.sku.value;

  }
}
