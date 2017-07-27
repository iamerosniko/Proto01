import { Component } from '@angular/core';
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { Skillset } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-skillset',
  templateUrl: 'vw_skillset.component.html',
})
export class VWSkillsetComponent {
  constructor(private skillsetSvc:SkillsetSvc){
    this.getskillsets();
  }
  viewMode : number = 0;
  skillset : Skillset = new Skillset(0,'',true);
  skillsets: Skillset[] = [];
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
    this.saveSkillset();
  }

  goBack(){
    this.mode=0;
  }

  async saveSkillset(){
    this.viewMode==0 ?  await this.skillsetSvc.postSkillset(this.skillset) : await this.skillsetSvc.putSkillset(this.skillset);
    document.getElementById("btnGoBack").click();
    this.getskillsets();
    this.skillset=new Skillset(0,'',true);
    this.goBack();
  }

  async getskillsets(){
    this.skillsets=await this.skillsetSvc.getSkillsets();
  }
}
