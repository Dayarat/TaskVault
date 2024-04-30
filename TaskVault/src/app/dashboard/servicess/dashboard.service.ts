import { HttpClient } from "@angular/common/http";
import { endpoint } from '../../const';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class dashBoardService {
  getUrl = `${endpoint}/todo`;
  updateUrl = `${endpoint}/todo`;
  constructor(private http: HttpClient){

  }

  getDetails(): Observable<any> {
    return this.http.get(this.getUrl);
  }

  updateDetail(reqestBody : any,id:string){
    console.log(`${this.updateUrl}/${id}`);
    const newRequest = {
      title: reqestBody.title,
      description : reqestBody.description
    }
    console.log(newRequest);
    return this.http.put(`${this.updateUrl}/${id}`,newRequest);
  }
}
