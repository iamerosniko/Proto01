import { 
    Component,Input,OnInit
} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'no-accessuser',
  template: `
    <div class="navbar navbar-blue_2 navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    
                </button>
                <a class="navbar-brand">Skillset Database</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
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
export class NoAccessUserComponent {
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
        //get the route state.
    }
}
