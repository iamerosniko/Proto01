import { Component } from '@angular/core';
import { Router }  from '@angular/router';
@Component({
  selector: 'maintenance',
  templateUrl: 'maintenance.component.html',
})
export class MaintenanceComponent {
  constructor(private router: Router){
    this.goView("Locations");
  }
  goView(path:string){

    this.router.navigate(['/maintenance', {outlets: {'maintenance-route': [path]}}]);
  }
}
