import { 
    Component,
    OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Set_User,User } from '../../com_entities/entities';
import { CurrentUserSvc } from '../../com_services/currentuser.svc';
import { Set_UserSvc } from '../../com_services/set_user.svc';
@Component({
  selector: 'main-container',
  template: `
    <div class="navbar navbar-blue_2 navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" >Skillset Database</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a href="#p1" data-toggle="tab" (click)="routeOnly('search')" class="lnk-search"><i class="fa fa-search"></i>&nbsp;Search</a></li>
                    <li class="active"><a href="#p2" (click)="routeOnly('skillset')" data-toggle="tab" class="lnk-skillset"><i class="fa fa-cogs"></i>&nbsp;Skillset</a></li>
                    <li><a href="#p3" data-toggle="tab" (click)="routeOnly('maintenance')"  class="lnk-maintenance"><i class="fa fa-wrench"></i>&nbsp;Maintenance</a></li>
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
export class ContainerComponent {
    private currentUser: User;
    private user: Set_User;
    private users:Set_User[];
    public fullName: string;

  constructor(
      private curUserSvc: CurrentUserSvc,
      private useSvc: Set_UserSvc,
    private router: Router,
  ){

  }
  routeOnly(path:string){
      this.router.navigate(['/'+path]);
  }
    async getCurrentUserData() {
        this.currentUser = await this.curUserSvc.getCurrentUser();
        this.users = await this.useSvc.getSet_Users();
        this.user = await this.users.find(user => user.user_name == this.currentUser.UserName);
        this.fullName = this.user.user_first_name + ' ' + this.user.user_last_name;
        this.curUserSvc = await null;
        this.useSvc = await null;
    }

    ngOnInit(): void {
        this.getCurrentUserData();
    }
}
