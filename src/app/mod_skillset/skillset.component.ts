import { 
  Component, 
  OnInit
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
  Department,
  Skillset,
  DepartmentSkillsets
} from '../com_entities/entities';
import { DepartmentSkillsetDBO } from  '../com_entities/dbo_skillset';
import { CurrentUserSvc } from '../com_services/currentuser.svc';
import { Set_UserSvc } from '../com_services/set_user.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { LocationSvc } from '../com_services/location.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { SkillsetSvc } from '../com_services/skillset.svc';
import { DepartmentSkillsetsSvc } from '../com_services/dept_skillset.svc'

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
  private skillsets: Skillset[];
  private departmentSkillsets: DepartmentSkillsets[];
  private departmentSkillsetDBOs: DepartmentSkillsetDBO[];
  private skillsetFrm: FormGroup;
  private skillsetCheck: any;

  constructor(
      private curUserSvc: CurrentUserSvc,
      private useSvc: Set_UserSvc,
      private assSvc: AssociateSvc,
      private locSvc: LocationSvc,
      private depSvc: DepartmentSvc,
      private sklSvc: SkillsetSvc,
      private dptSklSvc: DepartmentSkillsetsSvc,
      private fb: FormBuilder){
        
    this.skillsetFrm = this.fb.group({
      'UserName': [' '],
      'Department': [1],
      'Location': [1],
      'VPN': [false],
      'PhoneNumber': [' ',Validators.maxLength(20)],
      'UpdatedOn': [' ']
    });
    //TEST:
    //let checkBox1 = new FormControl();
    //this.skillsetFrm.addControl('checkBox1', checkBox1);
    //TEST:
  }
  
  //TEMPLATE: this will get all needed data
  async getDependencies() {
    this.currentUser = await this.curUserSvc.getCurrentUser();
    this.locations = await this.locSvc.getLocations();
    this.departments = await this.depSvc.getDepartments();
    this.skillsets = await this.sklSvc.getSkillsets();
    this.departmentSkillsets = await this.dptSklSvc.getDepartmentSkillsets();
  }
 
  //TEMPLATE: memory clean up
  cleanUp(): void {
      this.curUserSvc = null;
      this.useSvc = null;
      this.locSvc = null;
      this.depSvc = null;
      this.sklSvc = null;
      this.dptSklSvc = null;
  }

  //TEMPLATE: filter/sort data remove inactive
  async filterDataList() {
    this.locations = await this.locations.filter(location => location.IsActive == true);
    this.departments = await this.departments.filter(department => department.IsActive == true);
  }

  //TEMPLATE: this will run functions in order
  async runFunctions() {
    await this.getDependencies();
    await this.getCurrentUserData();
    await this.cleanUp();
    await this.filterDataList();
    await this.prepareDBO();
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

  //this will assign values to the object to be saved
  async assignValues(formData: any) {
    this.associateForPosting.DepartmentID = await formData.Department;
    this.associateForPosting.LocationID = await formData.Location;
    this.associateForPosting.VPN = await formData.VPN;
    this.associateForPosting.PhoneNumber = await formData.PhoneNumber;
    this.associateForPosting.UpdatedOn = await new Date(this.dateToday.setHours(-4));             
  }

  //this will prepare DBO
  async prepareDBO()  {
    if(this.departmentSkillsets && this.departments && this.skillsets) {
      //extract data from DepartmentSkillsets
      for (let item of this.departmentSkillsets) {
        let dptSklDBO = new DepartmentSkillsetDBO();
        dptSklDBO.DepartmentSkillsetID = item.DepartmentSkillsetID;
        dptSklDBO.DepartmentID = item.DepartmentID;
        dptSklDBO.SkillsetID = item.SkillsetID
        this.departmentSkillsetDBOs.push(dptSklDBO);
      }

      //get description of DepartmentID
      for (let item of this.departmentSkillsetDBOs) {
        let dpt = this.departments.find(dept => dept.DepartmentID === item.DepartmentID);
        item.DepartmentDescr = dpt.DepartmentDescr;
        item.DepartmentIsActive = dpt.IsActive;
      }

      //get description of Skillsets
      for (let item of this.departmentSkillsetDBOs) {
        let skl = this.skillsets.find(skill => skill.SkillsetID === item.SkillsetID);
        item.SkillsetDescr = skl.SkillsetDescr;
        item.SkillsetIsActive = skl.IsActive;
      }

      //this remove entries that are InActive
      this.departmentSkillsetDBOs = await this.departmentSkillsetDBOs.filter(dptSklDBO => dptSklDBO.DepartmentIsActive == true);
      this.departmentSkillsetDBOs = await this.departmentSkillsetDBOs.filter(dptSklDBO => dptSklDBO.SkillsetIsActive == true);
    } else {
      alert('There are missing dependencies');
    }
  }

  //this will map the skills selected by user
  mapSkillSet(): void {
    for ( let property in this.skillsetCheck ) {
      if( this.skillsetCheck.hasOwnProperty(property) ) {
        //alert(property);
        //let result += p + " , " + this.skillsetCheck[p] + "\n";
        for (let item of this.departmentSkillsetDBOs) {
          if( parseInt(property) == item.DepartmentSkillsetID) {
            item.IsSelected = this.skillsetCheck[property];
          }
        }
      } 
    } 
  }

  //add record in AssociateDepartmentSkill
  async addSkillset() {
    //this.skillsetCheck['3'] = true;
  }

  //remove record in AssociateDepartmentSkill
  async removeSkillset() {

  }

  //form submission
  async onSubmit(formData: any) {
    //!alert('Your record has been updated.')
    console.log('you submitted value:', formData);
    //! await this.assignValues(formData);
    //! await this.assSvc.putAssociate(this.associateForPosting);
    //! await this.mapSkillSet();
  }

  ngOnInit(): void {
    this.departmentSkillsetDBOs = [];
    this.skillsetCheck = {};
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
    //!this.runFunctions();

    //TEST:
    // this.testVal = this.skillsetFrm.controls;
    this.setMockValues();
    this.filterDataList();
    this.prepareDBO()
    this.skillsetCheck['3'] = true;
    this.skillsetCheck['4'] = true;
    //TEST:
  }

  


  //cocoM: {[k:string]: any} = {};
  //TEST:
  //counter: number = 0;
  //testVal: any;
  // arr:any =  [];
  // cocoM: any = {};
  // checkBox1: any;
  //<!--value="{{dateToday | date: 'dd/MM/yyyy'}}"/>-->
  // alertTest():void {
  //   ++this.counter; 
  //   alert(this.counter);
  // }
  setMockValues(): void {
    this.associate = 
      new Associate(
        1,
        'sarmife',
        '2233',
        true,
        5,
        3,
        new Date(),
        true
      );
    this.locations = [
      new Location(
        1,
        'New York',
        true
      ),
      new Location(
        2,
        'Michingan',
        false
      ),
      new Location(
        3,
        'Los Angel',
        false
      )
    ];
    this.departments = [
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
    this.skillsets = [
      new Skillset(
        1,
        'Windows',
        true
      ),
      new Skillset(
        2,
        'Linux',
        true
      ),
      new Skillset(
        3,
        'MacOS',
        true
      )
    ];
    this.departmentSkillsets = [
      new DepartmentSkillsets (
        1,
        2,
        1
      ),
      new DepartmentSkillsets (
        2,
        1,
        1
      ),
      new DepartmentSkillsets (
        3,
        1,
        2
      ),
      new DepartmentSkillsets (
        4,
        1,
        3
      )
    ];
  }
  //TEST:
}
