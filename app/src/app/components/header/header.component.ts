import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private userService: UserService, private tokenService:TokenService){}

  userRoleOfLoggedInUser:any 
  button:any

  ngOnInit(): void {
    this.userService.userRole.subscribe((res:any) => {
      this.userRoleOfLoggedInUser = res
    })
    this.userService.buttonFlag.subscribe((res:any) =>{
      this.button = res
    })
    console.log(this.button)
  }
  
  logout(){
    this.tokenService.logout()
    this.userService.buttonFlag.next(false)
    this.userService.logout().subscribe((res) =>{
      console.log('enter')
      console.log(res)
    })
  }


  isShowStudentPortal(){
    return this.userRoleOfLoggedInUser == 'admin' || this.userRoleOfLoggedInUser == 'teacher'
  }
}
