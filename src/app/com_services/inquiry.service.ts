import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Inquiry,InquiryResponse } from '../com_entities/inquiry';
@Injectable()
export class InquiryService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private apiUrl = 'https://btssweb.azurewebsites.net/4399a480-e29b-4f6e-9408-962bad10991e/Inquiry';

    constructor(private http: Http,
    ){
        
    }

    postInquiry(entity: Inquiry):Promise<InquiryResponse>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(response => response.json());
    }    
}
