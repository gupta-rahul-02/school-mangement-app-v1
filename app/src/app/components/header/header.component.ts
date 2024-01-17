import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private userService: UserService, private tokenService:TokenService){}
  ngOnInit(): void {
    this.userService.userRole.subscribe((res:any) => {
      this.userRoleOfLoggedInUser = res
    })
    this.tokenService.retriveToken().subscribe((res:any) =>{
      console.log(res)
    })
  }
  userRoleOfLoggedInUser:any 
  logout(){
    this.tokenService.logout()
    this.userService.logout().subscribe((res) =>{
      console.log(res)
    })
  }
}
