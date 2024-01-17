import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';
import { TokenService } from 'src/app/services/token/token.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  token:string = ''
  user:any
  dataSource:any
  constructor(private userService:UserService, private tokenService:TokenService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.token = this.tokenService.retriveToken()
    this.userService.getUser(this.token).subscribe((res) =>{
       
      this.user = res
      //console.log(this.user)
      this.userService.getUsers().subscribe((res)  => {
        this.userService.usersList.next(res)
      })
    })
    this.userService.usersList.subscribe((res2:any) => {
      this.dataSource = res2.users
      console.log(this.dataSource)
    })
}


}
