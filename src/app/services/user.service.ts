import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogIn = false


  mainUrl= `http://localhost:3000`
  apiUrl = `http://localhost:3000/api/user`;

  constructor(private http: HttpClient) { }


  login(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, obj)
  }



  userInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`)
  }
 
  retisterUser(obj: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, obj)
  }





}
