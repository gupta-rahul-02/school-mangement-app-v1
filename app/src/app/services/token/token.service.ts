import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }
  private key = 'token'
  
  
   store(token:string){
    sessionStorage.setItem(this.key,token)
  }

  logout(){
    console.log(document.cookie)
    window.sessionStorage.clear()
  }

   retriveToken(){
    let storedToken:any= sessionStorage.getItem(this.key);
    if(!storedToken) throw 'no token found'
    return storedToken
  }


}
