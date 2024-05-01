import { HttpClient } from "@angular/common/http";
import { endpoint } from '../../const';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class dashBoardService {
  url = `${endpoint}/todo`;
  constructor(private http: HttpClient){

  }

  getDetails(): Observable<any> {
    return this.http.get(this.url);
  }

  updateDetail(reqestBody : any,id:string){
    console.log(`${this.url}/${id}`);
    const newRequest = {
      title: reqestBody.title,
      description : reqestBody.description
    }
    console.log(newRequest);
    return this.http.put(`${this.url}/${id}`,newRequest);
  }
  addDetails(reqestBody : any){
    console.log(`${this.url}`);
    const newRequest = {
      title: reqestBody.title,
      description : reqestBody.description
    }
    console.log(newRequest);
    return this.http.post(`${this.url}`,newRequest);

  }

  deleteDetails(id:string){
    console.log(`${this.url}/${id}`);
    return this.http.delete(`${this.url}/${id}`);

  }
}
