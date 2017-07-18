import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Datetime } from 'ng2-datetime-picker';
import { HttpModule } from '@angular/http';
//skillset
import { SkillSetComponent } from './skillset.component';
import { SkillSetRouting } from './skillset.routing';
import { DepartmentComponent } from './department/department.component';
import { ProfileComponent } from './profile/profile.component';
//profile component
import { CommonCompModule } from '../mod_common/common_comp.module';
import { TextboxNameComponent } from './profile/textbox-name/textbox-name.component';
import { TextboxPhoneComponent } from './profile/textbox-phone/textbox-phone.component';
import { ComboboxLocationComponent } from './profile/combobox-location/combobox-location.component';
import { ComboboxDepartmentComponent } from './profile/combobox-department/combobox-department.component';
import { ToggleVpnComponent } from './profile/toggle-vpn/toggle-vpn.component';
import { TextboxUpdatedComponent } from './profile/textbox-updated/textbox-updated.component';
@NgModule({
  declarations: [
    SkillSetComponent,DepartmentComponent,
    ProfileComponent,
    TextboxNameComponent,
    TextboxPhoneComponent,
    ComboboxLocationComponent,
    ComboboxDepartmentComponent,
    ToggleVpnComponent,
    TextboxUpdatedComponent
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
