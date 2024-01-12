import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.userService.user.subscribe((res:any) =>{
      this.user = res
      console.log(this.user )
    })
  }

  getUser(){
    this.userService.user.subscribe((res:any)=>{
      console.log(res)
    })
  }
  

  user:any


 

}
