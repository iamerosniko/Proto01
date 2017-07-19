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
import { ProfileComponent } from './profile/profile.component';
//profile component
import { CommonCompModule } from '../mod_common/common_comp.module';

@NgModule({
  declarations: [
    SkillSetComponent,DepartmentComponent,
    ProfileComponent
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
  providers: [],
  exports: [
    SkillSetComponent,
    DepartmentComponent,
    ProfileComponent,
  ]
})
export class SkillsetModule { }
