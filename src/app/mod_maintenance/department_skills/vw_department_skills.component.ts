import { Component,OnInit } from '@angular/core';
import { DepartmentSvc } from '../../com_services/department.svc';
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../../com_services/assoc_dept_skillset.svc';
import { Department,Skillset,
  DepartmentSkillsets,SelectedSkillset,
  DepartmentSkillsets1,AssociateDepartmentSkillset } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-dept',
  templateUrl: 'vw_department_skills.component.html',
})
export class VWDepartmentSkillsComponent implements OnInit {
  constructor(
    private deptSvc:DepartmentSvc,
    private skillsetSvc:SkillsetSvc,
    private departmentSkillsetSvc:DepartmentSkillsetsSvc,
    private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc
  ){
    this.getDepartments();
  }
  ngOnInit(){
    this.getDepartments();
  }
  //department combobox
  checkallValue:boolean;
  tempDeptSkill:DepartmentSkillsets
  selectedDepartmentID:number=-1;
  associateDepartmentSkillset:AssociateDepartmentSkillset[]=[];
  departments: Department[] = [];
  skillsets: Skillset[]=[];
  //gets the previous state
  departmentSkillsets:DepartmentSkillsets[]=[];
  //gets the actual state
  selectedSkillsets:SelectedSkillset[]=[];
  //for deletion
  deleteDepartmentSkillsets:DepartmentSkillsets[]=[];
  //for new entry
  newDepartmentSkillsets:DepartmentSkillsets[]=[];
  //step1
  async getDepartments(){
    this.departments=await this.deptSvc.getDepartments();
    this.departments= this.departments.filter(x=>x.IsActive==true);
    this.getAssociateDepartmentSkillsets();    
  }
  async getAssociateDepartmentSkillsets(){
    this.associateDepartmentSkillset = await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();
  }
  //step2
  async getSkillSets(deptID:number){
    //reset checkall
    this.checkallValue=false;
    //1. get skillsets
    this.skillsets=await this.skillsetSvc.getSkillsets();
    //remove all inactive skillsets
    this.skillsets=await this.skillsets.filter(x=>x.IsActive==true);
    //clears the checkboxes
    this.selectedSkillsets=[];
    //2. loop skillsets to custom array
    for (var i = 0 ; i<this.skillsets.length; i++){
      console.log(deptID+" - "+this.skillsets[i].SkillsetID)
      this.selectedSkillsets.push(
        new SelectedSkillset( 
          new DepartmentSkillsets1(0,deptID,this.skillsets[i].SkillsetID)
          ,false
          ,this.skillsets[i].SkillsetDescr
        )
      );
    }
    this.getDepartmentSkillsets(deptID).then(()=>{
      this.compareSelectedSkillsets();
    });
  }
  //step3
  async getDepartmentSkillsets(deptID:number){
    this.departmentSkillsets = await this.departmentSkillsetSvc.getDepartmentSkillsets();
    this.departmentSkillsets = this.departmentSkillsets.filter(ds=>ds.DepartmentID==deptID);
  }
  //step 4
  async compareSelectedSkillsets(){

    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
        this.tempDeptSkill= await this.departmentSkillsets.find(ds=>
        ds.SkillsetID==selectedSkillset.departmentSkillset.SkillsetID);
      if (this.tempDeptSkill!=null){
        selectedSkillset.IsSelected=true;
      } 
    }
  }

  checkAllSkills(isChecked:boolean){
    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
      selectedSkillset.IsSelected=isChecked;
    }
  }
  
  async saveDepartmentSkillset(){
    //delete all departmentSkillsets
    //previous code -- eros 07-2017
    // for (var i = 0; i < this.departmentSkillsets.length; i++){
    //   var departmentSkillset=this.departmentSkillsets[i];
    //   await this.departmentSkillsetSvc.DeleteDepartmentSkillset(departmentSkillset.DepartmentSkillsetID);
    //   //create delete here for assocdepartmentskillset
    // }

    //addDepartmentSkillset
    //previous code -- eros 07-2017
    // for (var i = 0; i < this.selectedSkillsets.length; i++){
    //   var selectedSkillset=this.selectedSkillsets[i];
    //   if(selectedSkillset.IsSelected==true){
    //     await this.departmentSkillsetSvc.postDepartmentSkillset(selectedSkillset.departmentSkillset);
    //   }
    // }
    this.getDepartmentSkillsetsInSelectedSkillset().then(
      ()=>{
        this.deleteDepartmentSkillset().then(
          ()=>{
            this.addNewDepartmentSkillset();
          }
        )
      }
    );
    alert("Record has been successfully updated.");
  }

  async getDepartmentSkillsetsInSelectedSkillset(){

    for (var i = 0; i < this.selectedSkillsets.length; i++){
      var selectedSkillset=this.selectedSkillsets[i];
      this.deleteDepartmentSkillsets.push(selectedSkillset.departmentSkillset);
      selectedSkillset.IsSelected==true ? this.newDepartmentSkillsets.push(selectedSkillset.departmentSkillset) : null;
    }
    //return new Promise<DepartmentSkillsets[]>(resolve => newDepartmentSkillsets);
    //(x=>x=newDepartmentSkillsets);
  }
  
  async deleteDepartmentSkillset(){
    for (var i = 0; i < this.departmentSkillsets.length; i++){
      var departmentSkillset=this.departmentSkillsets[i];
      this.deleteDepartmentSkillsets= await this.deleteDepartmentSkillsets.filter(
        x=>x.DepartmentID!=departmentSkillset.DepartmentID &&
        x.SkillsetID!=departmentSkillset.SkillsetID
      )
    }
    //this will delete the departmentSkillset
    for (var i = 0; i < this.deleteDepartmentSkillsets.length; i++){
      var departmentSkillset=this.deleteDepartmentSkillsets[i];
      //delete to associateDepartmentSkillset
      this.deleteAssociateDepartmentSkillset(
        this.associateDepartmentSkillset.filter(
          x=>x.DepartmentSkillsetID=departmentSkillset.DepartmentSkillsetID
        )
      );
      await this.departmentSkillsetSvc.DeleteDepartmentSkillset(departmentSkillset.DepartmentSkillsetID);
    }

    //make a deletion for associatedepartmentskillset
  }

  async deleteAssociateDepartmentSkillset(ads:AssociateDepartmentSkillset[]){
    for (var i = 0 ;i < ads.length; i++){
      await this.assocDeptSkillsetSvc.DeleteAssociateDeptSkillset(ads[i].AssociateDepartmentSkillsetID);
    }
  }

  async addNewDepartmentSkillset(){
    for (var i = 0; i < this.deleteDepartmentSkillsets.length; i++){
      var departmentSkillset=this.deleteDepartmentSkillsets[i];
      this.newDepartmentSkillsets= await this.newDepartmentSkillsets.filter(
        x=>x.DepartmentID!=departmentSkillset.DepartmentID &&
        x.SkillsetID!=departmentSkillset.SkillsetID
      )
    }
    //this will add the new departmentSkillset
    for (var i = 0; i < this.newDepartmentSkillsets.length; i++){
      var selectedSkillset=this.newDepartmentSkillsets[i];
      await this.departmentSkillsetSvc.postDepartmentSkillset(selectedSkillset);
    }
  }
}
