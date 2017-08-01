import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SearchRouting } from './search.routing';
import { SelectModule } from 'ng2-select';
//components
import { SearchComponent } from './search.component';
//services
import { LocationSvc } from '../com_services/location.svc';
import { DepartmentSvc } from '../com_services/department.svc';
import { SkillsetSvc } from '../com_services/skillset.svc';
import { AssociateSvc } from '../com_services/associate.svc';
import { DepartmentSkillsetsSvc } from '../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../com_services/assoc_dept_skillset.svc';
@NgModule({
  //components area
  declarations: [
    SearchComponent,
    //maintenance-route

  ],
  //module area
  imports: [
    BrowserModule,HttpModule,CommonModule,FormsModule,
    SelectModule,
    SearchRouting
  ],
  //services area
  providers: [
    LocationSvc,DepartmentSvc,SkillsetSvc,AssociateSvc,
    DepartmentSkillsetsSvc,AssociateDepartmentSkillsetsSvc
  ],
  //components to be shared and used using selector
  exports: [
    SearchComponent,
    //maintenance-route
  ]
})
export class SearchModule { }
