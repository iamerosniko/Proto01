import { Injectable } from '@angular/core';
//services
import { DepartmentSvc } from '../../com_services/department.svc';
import { DepartmentSkillsetsSvc } from '../../com_services/dept_skillset.svc';
import { AssociateDepartmentSkillsetsSvc } from '../../com_services/assoc_dept_skillset.svc';
import { DataSkillsetReport } from './data-skillset.reports';
import { DataAssociateReport } from './data-associate.reports';
//entities
import { Department,
  Associate,
  AssociateDepartmentSkillset,DepartmentSkillsets1,
  AssociateRpt,DepartmentRpt
} from '../../com_entities/entities';
@Injectable()
export class DataDepartmentReport {
    constructor(
        private departmentSvc:DepartmentSvc,
        private departmentSkillsetSvc:DepartmentSkillsetsSvc,
        private assocDeptSkillsetSvc:AssociateDepartmentSkillsetsSvc,
        private skillsetRptSvc:DataSkillsetReport,
        private assocRptSvc:DataAssociateReport
        
    ){

    }

    tempAssociates:Associate[]=[];

    async getDepartmentReport(departmentID:number):Promise<DepartmentRpt>{
        let department:Department=await this.skillsetRptSvc.getDepartment(departmentID);
        let departmentRpt:DepartmentRpt=new DepartmentRpt('',[]);
        let departmentSkillsets:DepartmentSkillsets1[]=[];
        let associateDepartmentSkillsets:AssociateDepartmentSkillset[]=[];        
        let associates:Associate[]=[];
        
        this.tempAssociates=[];
        //get departmentskillset according to departmentID
        departmentSkillsets=await this.getDepartmentSkillsets(departmentID);
        //get associates from associatedepartmentSkillset according to departmentskillsets
        for(let departmentSkillset of departmentSkillsets){
            associateDepartmentSkillsets=associateDepartmentSkillsets.concat(await this.getAssociateDepartmentSkillset(departmentSkillset.DepartmentSkillsetID));
        }
        //console.log(associateDepartmentSkillsets);
        for(let associateDepartmentSkillset of associateDepartmentSkillsets){
            this.tempAssociates=this.tempAssociates.concat(await this.skillsetRptSvc.getAssociateDetails(associateDepartmentSkillset.AssociateID));
        }
        //getting associates for the current department
        while(this.tempAssociates.length>0){
            let tempAssoc = this.tempAssociates.pop();
            associates=associates.concat(tempAssoc);
            this.tempAssociates=this.tempAssociates.filter(x=>x.AssociateID!=tempAssoc.AssociateID);
        }
        //get their skills according to their current department
        for(let assoc of associates){
            departmentRpt.AssociateRpts=departmentRpt.AssociateRpts.concat(await this.assocRptSvc.getAssociateReport2(assoc.AssociateID,departmentID));
        }

        departmentRpt.Department=await department.DepartmentDescr;
        return new Promise<DepartmentRpt>((resolve) =>             
            resolve(departmentRpt)
        );
    }

    //getDepartmentSkillsets according to departmentID
    async getDepartmentSkillsets(departmentID:number):Promise<DepartmentSkillsets1[]>{
        let departmentSkillsets:DepartmentSkillsets1[]=await this.departmentSkillsetSvc.getDepartmentSkillsets();
        return new Promise<DepartmentSkillsets1[]>((resolve) =>             
            resolve(
                departmentSkillsets.filter(x=>x.DepartmentID==departmentID)
            )
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
