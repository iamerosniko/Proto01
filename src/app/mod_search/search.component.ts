import { Component,OnInit,ViewChild,ElementRef  } from '@angular/core';
import { Router }  from '@angular/router';
//services
import { SkillsetSvc } from '../com_services/skillset.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { LocationSvc } from '../com_services/location.svc';
import { Set_UserSvc } from '../com_services/set_user.svc';
import { ExportAssociateReport } from './export/exportassociate.reports';
import { ExportSkillsetReport } from './export/exportskillset.reports';
let jsPDF = require('jspdf');
//import * as jsPDF from 'jspdf';
// import { DepartmentSkillsetsSvc } from '../com_services/dept_skillset.svc';
// import { AssociateDepartmentSkillsetsSvc } from '../com_services/assoc_dept_skillset.svc';
//entities
import { Location,Department,Skillset,
  Associate,Set_User,ng2Items,
  AssociateRpt,SelectItem,
  SkillsetRpt  
} from '../com_entities/entities';
@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
})


export class SearchComponent implements OnInit {
  constructor(
    private associateSvc:AssociateSvc,
    private departmentSvc:DepartmentSvc,
    private locationSvc:LocationSvc,
    private skillsetSvc:SkillsetSvc,
    private setUserSvc:Set_UserSvc,
    private associateReportSvc:ExportAssociateReport,
    private skillsetReportSvc:ExportSkillsetReport
  ){

  }
  @ViewChild('assocRpt') el:ElementRef;
  radioSelect:number=0;
  selectedLocation:number=-1;
  public yourVariableName: any=[];
  //initial collection
  skillsets: Skillset[] = [];
  locations:Location[]=[];
  departments:Department[]=[];
  associates:Associate[]=[];
  set_Users:Set_User[]=[];
  associateRpt:AssociateRpt[]=[];
  skillsetRpt:SkillsetRpt[]=[];
  //ng2 select variables
  
  public items:any[]=[];
  public selectedItems:SelectItem[] = [];

  samp(){
    // let doc = new jsPDF();
    // doc.text("Hello", 20, 20);
    // doc.save('table.pdf');
    let pdf = new jsPDF();
   let options = {
      pagesplit: true,
      format:"PNG", background:"#FFFFFF"
   };
   pdf.addHTML(this.el.nativeElement, options, () => {
      pdf.save("test.pdf");
   });
  }

  ngOnInit(){
    this.getDependencies().then(
      ()=>{
        this.removeInactive().then(
          ()=>{
            this.getItems();
          }
        )
      });
  }

  async getResult(){
    if(this.radioSelect==0){
      this.associateRpt=[];
      for(var i = 0;i<this.selectedItems.length;i++){
        
        await this.associateReportSvc.getAssociateReport(this.selectedItems[i].id)
        .then(a=>{
            //console.log(a);
            if(a!=null){
              this.associateRpt.push(a);
            }
          }
        );
      }
      console.log(this.associateRpt);
    }
    else if (this.radioSelect==1){
      this.skillsetRpt=[];
      for(var i = 0;i<this.selectedItems.length;i++){
        await this.skillsetReportSvc.getSkillsetReport(this.selectedItems[i].id)
        .then(a=>this.skillsetRpt.push(a));
      }
      console.log(this.skillsetRpt);
    }
    else{
      
    }
  }

  async getDependencies(){
    this.associates = await this.associateSvc.getAssociates();
    this.locations = await this.locationSvc.getLocations();
    this.departments = await this.departmentSvc.getDepartments();
    this.set_Users = await this.setUserSvc.getSet_Users();
    this.skillsets=await this.skillsetSvc.getSkillsets();
  }

  async removeInactive(){
    this.locations=await this.locations.filter(x=>x.IsActive==true);
    this.departments=await this.departments.filter(x=>x.IsActive==true);
    this.associates=await this.associates.filter(x=>x.IsActive==true);
    this.skillsets=await this.skillsets.filter(x=>x.IsActive==true);
  }

  getFullName(username:string):string{
    let user:Set_User= this.set_Users.find(x=>x.user_name==username);
    return user==null ? null : user.user_first_name + ' ' + user.user_last_name
  }

  async getItems(){
    this.items=[];
    this.yourVariableName=[];
    this.associateRpt=[];
    this.skillsetRpt=[];
    this.selectedItems=[];
    if(this.radioSelect==0){
      let associates=this.associates.filter(x=>x.LocationID==this.selectedLocation);
      for(var i = 0; i<associates.length;i++){
        var fullName=this.getFullName(associates[i].UserName);
        this.items.push( { 'id': associates[i].AssociateID.toString(), 'text': this.getFullName(associates[i].UserName)});
      }
    }
    else if (this.radioSelect==1){
      for(var i = 0; i<this.skillsets.length;i++){
        this.items.push( { 'id': this.skillsets[i].SkillsetID.toString(), 'text': this.skillsets[i].SkillsetDescr});
      }
    }
    else{
      for(var i = 0; i<this.departments.length;i++){
        this.items.push( { 'id': this.departments[i].DepartmentID.toString(), 'text': this.departments[i].DepartmentDescr});
      }
    }
  }

  public refreshValue(value:any):void {
    this.selectedItems = value;
  }
 
}
