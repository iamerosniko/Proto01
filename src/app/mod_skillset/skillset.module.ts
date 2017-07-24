import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2Datetime } from 'ng2-datetime-picker';
import { HttpModule } from '@angular/http';
//skillset
import { SkillSetComponent } from './skillset.component';
import { SkillSetRouting } from './skillset.routing';
import { DepartmentComponent } from './department/department.component';
import { CommonCompModule } from '../mod_common/common_comp.module';
import { AssociateSvc } from '../com_services/associate.svc';
import { CurrentUserSvc } from '../com_services/currentuser.svc';
import { LocationSvc } from '../com_services/location.svc';
import { DepartmentSvc } from '../com_services/department.svc';

@NgModule({
  declarations: [
    SkillSetComponent,DepartmentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SkillSetRouting,
    CommonCompModule
  ],
  providers: [
    AssociateSvc,
    CurrentUserSvc,
    LocationSvc,
    DepartmentSvc
  ],
  exports: [
    SkillSetComponent,
    DepartmentComponent
  ]
})
export class SkillsetModule { }
