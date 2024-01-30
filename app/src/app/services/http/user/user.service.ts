import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // user:any = new BehaviorSubject('')
  usersList: any = new BehaviorSubject('');
  userRole: any = new BehaviorSubject('user');
  user: any = new BehaviorSubject('');
  buttonFlag: any = new BehaviorSubject(false);

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


  

  logout(){
    return this.http.get('http://localhost:3000/api/v1/user/logout')
  }

  delete(obj: any) {
    const url = `http://localhost:3000/api/v1/user/delete/${obj}`;
    return this.http.delete(url);
  }

  userArray(user: any) : Observable<any> {
    const propsToRemove = [
      '__v',
      '_id',
      'createdAt',
      'updateAt',
      'attendance',
      'requestRole',
      'isAbsentButtonDisabbled',
      'isPresentButtonDisabbled',
      'path'
      
    ];
    const userArray = Object.keys(user)
      .filter((key) => !propsToRemove.includes(key))
      .map((key) => ({ [key]: user[key] }));

    return of(userArray);
  }

  getTitleCase(key:any) :Observable<string> {
    if(typeof key === 'string'){
      return of((key as string).charAt(0).toUpperCase() + key.slice(1).toLowerCase());
    }else{
      return of('Unknown')
    }
  }
}
