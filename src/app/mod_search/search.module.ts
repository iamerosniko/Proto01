import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SearchRouting } from './search.routing';
//components
import { SearchComponent } from './search.component';
@NgModule({
  //components area
  declarations: [
    SearchComponent,
    //maintenance-route

  ],
  //module area
  imports: [
    BrowserModule,HttpModule,CommonModule,FormsModule,
    SearchRouting
  ],
  //services area
  providers: [],
  //components to be shared and used using selector
  exports: [
    SearchComponent,
    //maintenance-route
  ]
})
export class SearchModule { }
