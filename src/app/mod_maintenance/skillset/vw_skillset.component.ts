import { Component } from '@angular/core';
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { Skillset,DepartmentSkillsets } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-skillset',
  templateUrl: 'vw_skillset.component.html',
})
export class VWSkillsetComponent {
  constructor(private skillsetSvc:SkillsetSvc,
    private departmentSkillsetSvc:DepartmentSkillsetsSvc){
    this.goBack();
  }
  viewMode : number = 0;
  skillset : Skillset = new Skillset(0,'',true);
  skillsets: Skillset[] = [];
  departmentSkillsets:DepartmentSkillsets[]=[];
  mode:number=0;
  newDetails(){
    this.skillset=new Skillset(0,'',true);
  }

  editDetails(skillset: Skillset){
    this.viewMode=1;
    //get detail
    this.mode=1;
    this.getDetails(skillset);
  }

  getDetails(skillset : Skillset){
    this.skillset = skillset;
  }

  getStatus(status:boolean):string{
    return status ? "Yes" : "No";
  }

  changeStatus(skillset:Skillset){
    this.getDetails(skillset);
    this.viewMode=1;
    this.skillset.IsActive=false;
    this.deleteAssociatedToDepartmentSkillset(skillset.SkillsetID);
    this.saveSkillset();
  }

  async deleteAssociatedToDepartmentSkillset(skillsetID:number){
    this.departmentSkillsets=this.departmentSkillsets.filter(x=>x.SkillsetID==skillsetID);
    console.log(this.departmentSkillsets);
    for(var i = 0 ; i<this.departmentSkillsets.length ;i++)
    {
      var deptSkillset=this.departmentSkillsets[i];
      await this.departmentSkillsetSvc.DeleteDepartmentSkillset(deptSkillset.DepartmentSkillsetID);
    }
    console.log('done');
  }

  goBack(){
    this.getskillsets();
    this.getDepartmentSkillsets();
    this.mode=0;
    this.skillset=new Skillset(0,'',true);
  }

  async saveSkillset(){
    if(this.entryValidation()){
      this.viewMode==0 ?
        ( 
          await this.skillsetSvc.postSkillset(this.skillset),
          alert("New Record has been successfully added.") 
        ) :
        ( 
          await this.skillsetSvc.putSkillset(this.skillset),
          alert("Record has been successfully updated.")
        );
      document.getElementById("btnGoBack").click();
      this.goBack();
    }
  }

  entryValidation():boolean{
    var msg='';
    this.skillset.SkillsetDescr.trim()=='' ? msg+='Skill Description is Required.\n' : null ;
    return msg==''?(true):(alert(msg),false);
  }

  async getskillsets(){
    this.skillsets=await this.skillsetSvc.getSkillsets();
  }
  async getDepartmentSkillsets(){
    this.departmentSkillsets = await this.departmentSkillsetSvc.getDepartmentSkillsets();
  }
}
