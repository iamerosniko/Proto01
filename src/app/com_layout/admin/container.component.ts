import { 
    Component,Input,OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-container',
  template: `
    <div class="navbar navbar-blue_2 navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <!--<span class="icon-bar"></span>-->
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" >Skillset Database</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li [ngClass]="{'active' : routeUrl=='/search'}"><a href="#p1" data-toggle="tab" (click)="routeOnly('search')" class="lnk-search"><i class="fa fa-search"></i>&nbsp;Search</a></li>
                    <!--<li [ngClass]="{'active' : routeUrl=='/skillset'}"><a href="#p2" (click)="routeOnly('skillset')" data-toggle="tab" class="lnk-skillset"><i class="fa fa-cogs"></i>&nbsp;Skillset</a></li>-->
                    <li [ngClass]="{'active' : routeUrl.includes('/maintenance')}"><a href="#p3" data-toggle="tab" (click)="routeOnly('maintenance')"  class="lnk-maintenance"><i class="fa fa-wrench"></i>&nbsp;Maintenance</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#"><i class="fa fa-user-circle"></i>&nbsp;Hello, {{fullName}}!</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="main-body">
      <router-outlet></router-outlet>
    </div>
  `

})
export class ContainerComponent implements OnInit {
    @Input() fullName:string;
    @Input() routeUrl:string;
    currentUrl:string='';
    constructor(
        private router: Router,
    ){

    }
    routeOnly(path:string){
        this.router.navigate(['/'+path]);
    }
    ngOnInit(){
    }
}
