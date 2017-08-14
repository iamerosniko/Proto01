import { 
  Component, 
  OnInit
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators,
  FormControl
} from '@angular/forms';
import {
  Associate,
  Set_User,
  Location,
  Department,
  Skillset,
  DepartmentSkillsets,
  AssociateDepartmentSkillset
} from '../com_entities/entities';
import { DepartmentSkillsetDBO } from  '../com_entities/dbo_skillset';
import { CurrentUserSvc } from '../com_services/currentuser.svc';
import { Set_UserSvc } from '../com_services/set_user.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { LocationSvc } from '../com_services/location.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { SkillsetSvc } from '../com_services/skillset.svc';
import { DepartmentSkillsetsSvc } from '../com_services/dept_skillset.svc'
import { AssociateDepartmentSkillsetsSvc } from '../com_services/assoc_dept_skillset.svc';

@Component({
  moduleId: module.id,
  selector: 'skillset',
  templateUrl: 'skillset.component.html',
})

export class SkillSetComponent {
  private dateToday: Date;
  private currentUser: any;
  private associates: Associate[];
  public associate: Associate=new Associate(0,'test','test',false,0,0,new Date(),false);
  private associateForPosting: Associate;
  private users: Set_User[];
  private user: Set_User;
  public locations: Location[];
  public departments: Department[];
  private skillsets: Skillset[];
  private departmentSkillsets: DepartmentSkillsets[];
  private associateDepartmentSkillsets: AssociateDepartmentSkillset[];
  private departmentSkillsetDBOs: DepartmentSkillsetDBO[];
  public skillsetFrm: FormGroup;
  private skillsetCheck: any;

  constructor(
      private curUserSvc: CurrentUserSvc,
      private useSvc: Set_UserSvc,
      private assSvc: AssociateSvc,
      private locSvc: LocationSvc,
      private depSvc: DepartmentSvc,
      private sklSvc: SkillsetSvc,
      private dptSklSvc: DepartmentSkillsetsSvc,
      private assDptSklSvc: AssociateDepartmentSkillsetsSvc,
      private fb: FormBuilder){
        

    this.skillsetFrm = this.fb.group({
      'UserName': [' '],
      'Department': [1, Validators.required],
      'Location': [1, Validators.required],
      'VPN': [false],
      'PhoneNumber': [' ',Validators.maxLength(20)],
      'UpdatedOn': [' ']
    });
  }
  
  //TEMPLATE: this will get all needed data
  async getDependencies() {
    this.associates = await this.assSvc.getAssociates();//
    this.users = await this.useSvc.getSet_Users();
    this.currentUser = await this.curUserSvc.getCurrentUser();
    this.locations = await this.locSvc.getLocations();
    this.departments = await this.depSvc.getDepartments();
    this.skillsets = await this.sklSvc.getSkillsets();
    this.departmentSkillsets = await this.dptSklSvc.getDepartmentSkillsets();
    this.associateDepartmentSkillsets = await this.assDptSklSvc.getAssociateDeptSkillsets();
  }
 
  //TEMPLATE: memory clean up
  cleanUp(): void {
      this.useSvc = null;
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
    
    this.departmentSkillsetDBOs = await [];
    this.skillsetCheck = await {};
    this.dateToday = await new Date();
    await this.getDependencies();
    await this.getCurrentUserData();
    await this.cleanUp();
    await this.filterDataList();
    await this.prepareDBO();
  }

  //this will get info of current user
  async getCurrentUserData() {
    this.associate = await this.associates.find(associate => associate.UserName == this.currentUser.UserName);//
    this.user = await this.users.find(user => user.user_name == this.currentUser.UserName);
    this.associateForPosting = await JSON.parse(JSON.stringify(this.associate));
    this.associate.UserName =  await this.user.user_first_name + ' ' + this.user.user_last_name;
    
    //this will obtain current users skills
    this.associateDepartmentSkillsets = 
        await this.associateDepartmentSkillsets.filter(AssociateDepartmentSkillsetSkillset => 
        AssociateDepartmentSkillsetSkillset.AssociateID == this.associateForPosting.AssociateID);
    for (let assDptSkl of this.associateDepartmentSkillsets) {
      this.skillsetCheck[assDptSkl.DepartmentSkillsetID] = await true;
    }
  }

  //this will assign values to the object to be saved
  async assignValues(formData: any) {
    this.associateForPosting.DepartmentID = await formData.Department;
    this.associateForPosting.LocationID = await formData.Location;
    this.associateForPosting.VPN = await formData.VPN;
    this.associateForPosting.PhoneNumber = await formData.PhoneNumber;
    this.associateForPosting.UpdatedOn = await new Date(this.dateToday.setHours(-3));             
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
        //let result += p + " , " + this.skillsetCheck[p] + "\n";
        for (let item of this.departmentSkillsetDBOs) {
          if( parseInt(property) == item.DepartmentSkillsetID) {
            item.IsSelected = this.skillsetCheck[property];
          }
        }
      }
    } 
  }

  //this will refresh AssociateDepartmentSkillset list 
  async refreshAssociateDepartmentSkillset() {
    this.associateDepartmentSkillsets = await this.assDptSklSvc.getAssociateDeptSkillsets();
    this.associateDepartmentSkillsets = 
        await this.associateDepartmentSkillsets.filter(AssociateDepartmentSkillsetSkillset => 
        AssociateDepartmentSkillsetSkillset.AssociateID == this.associateForPosting.AssociateID);
  }

  //add record in AssociateDepartmentSkillset
  async addSkillset() {
    await this.refreshAssociateDepartmentSkillset();
    var tempDepartmentSkillsetDBOs = await this.departmentSkillsetDBOs.filter(departmentSkillsetDBOs =>
        departmentSkillsetDBOs.IsSelected == true);

    for (let tempDptSklDBO of tempDepartmentSkillsetDBOs) {
      let tempAssDeptSkl = await this.associateDepartmentSkillsets.find(associateDepartmentSkillset =>
          associateDepartmentSkillset.DepartmentSkillsetID == tempDptSklDBO.DepartmentSkillsetID);
      if (!tempAssDeptSkl) {
        let assDptSkl = await new AssociateDepartmentSkillset();
        assDptSkl.AssociateID = await this.associateForPosting.AssociateID;
        assDptSkl.DepartmentSkillsetID = await tempDptSklDBO.DepartmentSkillsetID;
        await this.assDptSklSvc.postAssociateDeptSkillset(assDptSkl);
      }
    }
  }

  //remove record in AssociateDepartmentSkillset
  async removeSkillset() {
    await this.refreshAssociateDepartmentSkillset();
    var tempDepartmentSkillsetDBOs = await this.departmentSkillsetDBOs.filter(departmentSkillsetDBOs =>
        departmentSkillsetDBOs.IsSelected == false);

    for (let tempDptSklDBO of tempDepartmentSkillsetDBOs) {
      var assDptSkl = await this.associateDepartmentSkillsets.find(tempAssociateDepartmentSkillset =>
          tempAssociateDepartmentSkillset.DepartmentSkillsetID == tempDptSklDBO.DepartmentSkillsetID);
      
      if (assDptSkl) {
        await this.assDptSklSvc.DeleteAssociateDeptSkillset(assDptSkl.AssociateDepartmentSkillsetID);
      }
    }
  }

  //form submission
  async onSubmit(formData: any) {
    //console.log('you submitted value:', formData);
    alert('Your record has been updated.');
    await this.assignValues(formData);
    await this.assSvc.putAssociate(this.associateForPosting);
    await this.mapSkillSet();
    await this.addSkillset();
    await this.removeSkillset();
  }

  ngOnInit(): void {
    
    
    this.runFunctions();
  } 
}
