import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  user:any = new Subject()

  signup(obj:object){
    return this.http.post('http://localhost:3000/api/v1/user/signup',obj)
  }

  login(obj:object){
    return this.http.post('http://localhost:3000/api/v1/user/login',obj,{ withCredentials: true })
  }
}
