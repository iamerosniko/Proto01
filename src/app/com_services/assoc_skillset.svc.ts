import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AssociateSkillsets } from '../com_entities/entities';
import { AppSettings } from '../com_entities/app_settings';
@Injectable()
export class AssociateSkillsetsSvc {
    private headers = new Headers({'Content-Type': 'application/json'});
    // private apiUrl = 'api/AssociateSkillsets';
    //private apiUrl = 'https://skillsetazureuat.azurewebsites.net/api/AssociateSkillsets';
    //private apiUrl = 'https://skillsetazure.azurewebsites.net/api/AssociateSkillsets';
    private apiUrl = AppSettings.CURRENT_URL + 'AssociateSkillsets';

    constructor(private http: Http){}

    getAssociateSkillsets(): Promise<AssociateSkillsets[]> {
        return this.http
                .get(this.apiUrl, {headers: this.headers})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    getAssociateSkillset(id: string): Promise<AssociateSkillsets> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
                .get(url)
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);
    }

    postAssociateSkillset(entity: AssociateSkillsets):Promise<any>{
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    putAssociateSkillset(entity: AssociateSkillsets): Promise<any> {
        const url = `${this.apiUrl}/${entity.AssociateID}`;
        return this.http
            .put(url, JSON.stringify(entity), {headers: this.headers})
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }

    DeleteAssociateSkillset(id: number): Promise<boolean> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
