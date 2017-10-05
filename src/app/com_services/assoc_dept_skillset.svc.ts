import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AssociateDepartmentSkillset } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
//BTSS INtegration
import { Inquiry, InquiryResponse } from '../com_entities/inquiry';
import { InquiryService } from './inquiry.service';
@Injectable()
export class AssociateDepartmentSkillsetsSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    private apiUrl = AppSettings.CURRENT_URL + 'AssociateDepartmentSkillsets';

    inquiryResponse:InquiryResponse=new InquiryResponse(false,'');
    inquiry:Inquiry=new Inquiry(AppSettings.APPLICATION_NAME,'AssociateDepartmentSkillset','','');
    constructor(private http: Http,
        private inquirySvc:InquiryService
    ){}

    getAssociateDeptSkillsets(): Promise<AssociateDepartmentSkillset[]> {
        // this.getInquiryResult('get','');
        // if(this.inquiryResponse.Result)
            return this.http
                    .get(this.apiUrl, {headers: this.headers})
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);     
    }

    getAssociateDeptSkillset(id: string): Promise<AssociateDepartmentSkillset> {
        const url = `${this.apiUrl}/${id}`;
        // this.getInquiryResult('get','');
        // if(this.inquiryResponse.Result)
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    postAssociateDeptSkillset(entity: AssociateDepartmentSkillset):Promise<any>{
        //this.getInquiryResult('post','');
        //if(this.inquiryResponse.Result)
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    putAssociateDeptSkillset(entity: AssociateDepartmentSkillset): Promise<any> {
        const url = `${this.apiUrl}/${entity.AssociateDepartmentSkillsetID}`;
        // this.getInquiryResult('put','');
        // if(this.inquiryResponse.Result)
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    DeleteAssociateDeptSkillset(id: number): Promise<boolean> {
        const url = `${this.apiUrl}/${id}`;
        // this.getInquiryResult('delete','');
        // if(this.inquiryResponse.Result)
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }

    async getInquiryResult(action:string,username:string){
        this.inquiry.Action=action;
        this.inquiry.UserName=username;
        this.inquiryResponse = await this.inquirySvc.postInquiry(this.inquiry);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
