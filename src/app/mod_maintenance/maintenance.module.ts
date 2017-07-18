import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaintenanceRouting } from './maintenance.routing';
//components
import { MaintenanceComponent } from './maintenance.component';
import { VWAssociateComponent } from './associate/vw_associate.component';
import { VWDepartmentComponent } from './department/vw_department.component';
import { VWLocationComponent } from './location/vw_location.component';
import { VWSkillsetComponent } from './skillset/vw_skillset.component';
//common
import { CommonCompModule } from '../mod_common/common_comp.module';
//services
import { LocationSvc } from '../com_services/location.svc';
@NgModule({
  //components area
  declarations: [
    MaintenanceComponent,
    //maintenance-route
    VWAssociateComponent,VWDepartmentComponent,VWLocationComponent,VWSkillsetComponent
  ],
  //module area
  imports: [
    BrowserModule,HttpModule,CommonModule,FormsModule,CommonCompModule,
    MaintenanceRouting
  ],
  //services area
  providers: [
    LocationSvc
  ],
  //components to be shared and used using selector
  exports: [
    MaintenanceComponent,
    //maintenance-route
    VWAssociateComponent,VWDepartmentComponent,VWLocationComponent,VWSkillsetComponent
  ]
})
export class MaintenanceModule { }