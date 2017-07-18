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
  editDetails(){
    this.viewMode=1;
    //get detail
  }
  getDetails(loc : Location){
    this.location = loc;
  }

  async saveLocation(){
    this.viewMode==0 ?  await this.locSvc.postLocation(this.location) : await this.locSvc.putLocation(this.location);
    alert("yes");
  }

  async getLocations(){
    this.locations=await this.locSvc.getLocations();
  }
}
