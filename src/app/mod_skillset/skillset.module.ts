import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Datetime } from 'ng2-datetime-picker';
import { HttpModule } from '@angular/http';
//skillset
import { SkillSetComponent } from './skillset.component';
import { SkillSetRouting } from './skillset.routing';
import { DepartmentComponent } from './department.component';
import { ProfileComponent } from './profile.component';
//common
import { CommonCompModule } from '../mod_common/common_comp.module';
@NgModule({
  declarations: [
    SkillSetComponent,DepartmentComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,HttpModule,CommonModule,FormsModule,
    CommonCompModule,SkillSetRouting
  ],
  providers: [],
  exports: [
    SkillSetComponent,DepartmentComponent,
    ProfileComponent,
  ]
})
export class SkillsetModule { }
