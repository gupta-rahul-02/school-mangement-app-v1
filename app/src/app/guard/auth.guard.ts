import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/http/user/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  // UserService : UserService
  console.log(route)
  console.log(state)
  if(state.url === '/login'){
    return true
  }if(sessionStorage.getItem('token')){
    return true
  }else{
    return false
  }
  // return true;
};
