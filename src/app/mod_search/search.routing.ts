import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//component
import { SearchComponent } from './search.component';

const routes: Routes = [
    //paths
    {
      path : 'search', component : SearchComponent,
    }
];

 @NgModule ({
     imports: [ RouterModule.forChild(routes) ],
     exports: [ RouterModule ]
 })

export class SearchRouting {}
