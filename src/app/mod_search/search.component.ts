import { Component,OnInit  } from '@angular/core';
import { Router }  from '@angular/router';
//services
import { SkillsetSvc } from '../com_services/skillset.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { LocationSvc } from '../com_services/location.svc';
import { Set_UserSvc } from '../com_services/set_user.svc';
// import { DepartmentSkillsetsSvc } from '../com_services/dept_skillset.svc';
// import { AssociateDepartmentSkillsetsSvc } from '../com_services/assoc_dept_skillset.svc';
//entities
import { Location,Department,Skillset,
  Associate,Set_User,ng2Items } from '../com_entities/entities';
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
    private setUserSvc:Set_UserSvc
  ){

  }
  radioSelect:number=0;
  public yourVariableName: any=[ ];
  //initial collection
  skillsets: Skillset[] = [];
  locations:Location[]=[];
  departments:Department[]=[];
  associates:Associate[]=[];
  set_Users:Set_User[]=[];
  //ng2-select items
  public associateItems:any[]=[];//Array<string>=[];
  ngOnInit(){
    this.getDependencies().then(
      ()=>{
        this.removeInactive().then(
          ()=>{
            this.getItems();
          }
        )
      });
    //this.removeInactive();
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
    //console.log(user);
    return user==null ? null : user.user_first_name + ' ' + user.user_last_name
  }

  async getItems(){
    this.items=[];
    if(this.radioSelect==0){
      console.log(this.associates.length)
      for(var i = 0; i<this.associates.length;i++){
        var fullName=this.getFullName(this.associates[i].UserName);
        this.items.push( { 'id': this.associates[i].AssociateID.toString(), 'text': this.getFullName(this.associates[i].UserName)});
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












  public items:any[]=[];
  //public items:Array<string>;
  // public items:Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
  //   'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
  //   'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
  //   'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
  //   'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
  //   'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
  //   'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
  //   'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
  //   'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];
 
  public value:any = ['Athens'];
 
  // public selected(value:any):void {
  //   console.log('Selected value is: ', value);
  // }
 
  // public removed(value:any):void {
  //   console.log('Removed value is: ', value);
  // }
 
  public refreshValue(value:any):void {
    this.value = value;
  }
 
  
  

  public itemsToString(value:Array<any> = []):string {
    return value
      .map((item:any) => {
        return item.text;
      }).join(',');
  }


}
