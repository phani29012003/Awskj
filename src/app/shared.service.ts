import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly url="https://localhost:44337/";
  constructor(private http:HttpClient) { }
  getdata():Observable<any[]>{
    return this.http.get<any>(this.url+"GetParticipantsList");
  }
  adddata(data:any){
    return this.http.post(this.url+"AddParticipant",data);
  }
  sendmail(data:any){
    return this.http.post("http://localhost:3000/sendmail",data);
  }
  getfrommail(data:any){
    return this.http.post(this.url+"GetParticipant",data);
  }
  updateuser(data:any){
    return this.http.put(this.url+"UpdateParticipant",data);
  }
  getadmin(data:any){
    return this.http.post(this.url+"CheckParticipant",data);
  }
}
