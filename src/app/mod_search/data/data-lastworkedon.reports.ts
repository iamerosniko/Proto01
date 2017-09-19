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
export class DataLastworkedon {
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
    associateDepartmentSkillsets:AssociateDepartmentSkillset[]=[];
    departmentSkillsets:DepartmentSkillsets1[]=[];
    skillsets:Skillset[]=[];
    Departments:Department[]=[];
    associates:Associate[]=[];
    setUser:Set_User[]=[];
    locations:Location[]=[];


    async getLastWorkedOnRpt(){
        await this.getDependencies();
    }

    async getDependencies(){
        this.associateDepartmentSkillsets= await this.assocDeptSkillsetSvc.getAssociateDeptSkillsets();
        this.locations=await this.locationSvc.getLocations();
        this.associates=await this.associateSvc.getAssociates();
        this.skillsets=await this.skillsetSvc.getSkillsets();
        this.Departments=await this.departmentSvc.getDepartments();
        this.departmentSkillsets=await this.departmentSkillsetSvc.getDepartmentSkillsets();
        this.setUser=await this.setUserSvc.getSet_Users();
    }
}
