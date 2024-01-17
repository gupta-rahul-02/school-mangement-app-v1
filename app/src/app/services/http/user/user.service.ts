import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // user:any = new BehaviorSubject('')
  usersList: any = new BehaviorSubject('');
  userRole: any = new BehaviorSubject('user');
  user: any = new BehaviorSubject('');
  buttonFlag:any = new BehaviorSubject(false)
  signup(obj: object) {
    return this.http.post('http://localhost:3000/api/v1/user/signup', obj, {
      withCredentials: true,
    });
  }

  login(obj: object) {
    return this.http.post('http://localhost:3000/api/v1/user/login', obj, {
      withCredentials: true,
    });
  }

  getUser(token: string) {
    return this.http.get('http://localhost:3000/api/v1/user/token/' + token);
  }

  getUsers() {
    const sessionToken: any = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', sessionToken);
    return this.http.get('http://localhost:3000/api/v1/user/users', {
      headers,
    });
  }

  logout() {
    const sessionToken: any = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', sessionToken);
    return this.http.get('http://localhost:3000/api/v1/user/users', {
      headers,
    });
  }

  delete(obj: any) {
    console.log(obj);
    const url = `http://localhost:3000/api/v1/user/delete/${obj}`;
    return this.http.delete(url);
  }
}
