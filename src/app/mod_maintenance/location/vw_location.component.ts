import { Component } from '@angular/core';
import { LocationSvc } from '../../com_services/location.svc';
import { Location } from '../../com_entities/entities';
@Component({
  moduleId: module.id,
  selector: 'vw-location',
  templateUrl: 'vw_location.component.html',
})
export class VWLocationComponent {
  constructor(private locSvc:LocationSvc){
    this.getLocations();
  }
  viewMode : number = 0;
  location : Location = new Location(0,'',true);
  locations: Location[] = [];

  newDetails(){
    this.location=new Location(0,'',true);
  }

  editDetails(loc: Location){
    this.viewMode=1;
    //get detail
    this.getDetails(loc);
  }
  getDetails(loc : Location){
    this.location = loc;
  }

  async saveLocation(){
    this.viewMode==0 ?  await this.locSvc.postLocation(this.location) : await this.locSvc.putLocation(this.location);
    alert("yes");
    document.getElementById("btnGoBack").click();
    this.getLocations();
    this.location=new Location(0,'',true);
  }

  async getLocations(){
    this.locations=await this.locSvc.getLocations();
  }
}
