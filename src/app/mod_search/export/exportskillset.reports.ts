
import { Injectable } from '@angular/core';
//services
import { SkillsetSvc } from '../../com_services/skillset.svc';
import { DepartmentSvc } from '../../com_services/department.svc';
import { AssociateSvc } from '../../com_services/associate.svc';
import { LocationSvc } from '../../com_services/location.svc';
import { Set_UserSvc } from '../../com_services/set_user.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../../com_services/assoc_dept_skillset.svc';
//entities
import { Location,Department,Skillset,
  Associate,Set_User,
  AssociateDepartmentSkillset,DepartmentSkillsets1,
  AssociateRpt,DepartmentSkills, 
  //skillsetReport
  SkillsetRpt,AssociateDetails
} from '../../com_entities/entities';

@Injectable()
export class ExportSkillsetReport {
    constructor(
        private associateSvc:AssociateSvc,
        private departmentSvc:DepartmentSvc,
        private locationSvc:LocationSvc,
        private skillsetSvc:SkillsetSvc,
        private setUserSvc:Set_UserSvc,
        private departmentSkillsetSvc:DepartmentSkillsetsSvc,
        private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc
    ){

    }
    associateReport:AssociateRpt=new AssociateRpt('','','','','','',[]);
    associates:AssociateDetails[]=[];
    setUsers:Set_User[]=[];


    skillsetRpt:SkillsetRpt;
    async getSkillsetReport(skillsetID:number):Promise<SkillsetRpt>{
        this.skillsetRpt=new SkillsetRpt('',[]);
        this.associates=[];
        await this.getSetUser();
        //step 1 get skillsetName
        let skillset:Skillset=await this.getSkillset(skillsetID);
        let associatedepartmentskillset:AssociateDepartmentSkillset[]=[];
        //step 2 get associates from DepartmentSkillset and associatedepartmentskillset
        let departmentSkillsets:DepartmentSkillsets1[]=await this.getDepartmentSkillsets(skillsetID);
        for(var i = 0 ; i<departmentSkillsets.length;i++){
            //get associate from associatedepartmentskillset
            associatedepartmentskillset=associatedepartmentskillset.concat(await this.getAssociateDepartmentSkillset(departmentSkillsets[i].DepartmentSkillsetID));
        }
        //getting the associate
        await this.getAssociateInfo(associatedepartmentskillset);

        this.skillsetRpt.Associates=await this.associates;
        this.skillsetRpt.Skillset=await skillset.SkillsetDescr;
        return new Promise<SkillsetRpt>((resolve) =>             
            resolve(this.skillsetRpt)
        );
    }

    async getAssociateInfo(assocDeptSkillset:AssociateDepartmentSkillset[]){
        let associateDetails:AssociateDetails=new AssociateDetails('','','','','');
        console.log(assocDeptSkillset);
        //note: change for to while assocDeptSkillset.leng>0
        for(var i =0;i<assocDeptSkillset.length;i++){
            let associate:Associate=await this.getAssociateDetails(assocDeptSkillset[i].AssociateID);
           
            let department:Department=await this.getDepartment(associate.DepartmentID);
            let location:Location=await this.getLocation(associate.LocationID);
            associateDetails.Department=await department.DepartmentDescr;
            associateDetails.Location=await location.LocationDescr;
            associateDetails.Name=await this.getFullName(associate.UserName);
            associateDetails.VPN=associate.VPN?'Yes':'No';
            associateDetails.UpdatedOn='';

            this.associates.push(associateDetails);

            associateDetails=new AssociateDetails('','','','','');
        }
    }

    async getDepartmentSkillsets(skillsetID):Promise<DepartmentSkillsets1[]>{
        let departmentSkillsets:DepartmentSkillsets1[]=await this.departmentSkillsetSvc.getDepartmentSkillsets();
        return new Promise<DepartmentSkillsets1[]>((resolve) =>             
            resolve(
                departmentSkillsets.filter(x=>x.SkillsetID==skillsetID)
            )
        );
    }

    async getAssociateDetails(assocID:number):Promise<Associate>{
        return new Promise<Associate[]>((resolve) =>
            resolve(this.associateSvc.getAssociate(assocID))
        );
    }

    async getSetUser(){
        this.setUsers=await this.setUserSvc.getSet_Users();
    }

    getFullName(username:string):string{
        let user:Set_User= this.setUsers.find(x=>x.user_name==username);
        // //console.log(user);
        return user==null ? null : user.user_first_name + ' ' + user.user_last_name
    }

    async getDepartment(departmentID:number):Promise<Department>{
        return new Promise<Department>((resolve)=>
            resolve(this.departmentSvc.getDepartment(departmentID))
        );
    }
    async getLocation(locationID:number):Promise<Location>{
        return new Promise<Location>((resolve) => 
            resolve(this.locationSvc.getLocation(locationID))
        );
    }

    async getSkillset(skillsetID:number):Promise<Skillset>{
        return new Promise<Skillset>((resolve) =>
            resolve(this.skillsetSvc.getSkillset(skillsetID))
        );
    }

    async getAssociateDepartmentSkillset(departmentSkillsetID:number):Promise<AssociateDepartmentSkillset[]>{
        let associateDepartmentSkillset:AssociateDepartmentSkillset[]=await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();

        associateDepartmentSkillset=associateDepartmentSkillset.filter(x=>x.DepartmentSkillsetID==departmentSkillsetID);
        return new Promise<AssociateDepartmentSkillset[]>((resolve) =>
            resolve(associateDepartmentSkillset)
        );
    }

}

