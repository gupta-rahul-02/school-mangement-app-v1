import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }
  private key = 'token'
  
   store(token:string){
    console.log('called')
    console.log(token)
    sessionStorage.setItem(this.key,token)
  }

   retriveToken(){
    let storedToken:any= sessionStorage.getItem(this.key);
    if(!storedToken) throw 'no token found'
    return storedToken

  }
}
