import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    
  ) {}

  token: string = '';
  user: any;
  propsToRemove = ['__v', '_id', 'createdAt', 'updateAt','attendance','requestRole'];
  userArray: any;
  keyTitle:any
  noOfPresentDays:number =0
  noOfAbsentDays:number = 0


  ngOnInit(): void {
    this.token = this.tokenService.retriveToken();
    this.userService.getUser(this.token).subscribe((res:any) => {
      this.user = res;
      console.log(this.user)
       this.noOfPresentDays = this.user.attendance.filter((data:any) =>( data.status === 'present')).length
      this.noOfAbsentDays = this.user.attendance.length - this.noOfPresentDays
      console.log(this.noOfAbsentDays)
      this.userService.userRole.next(this.user.role)
      this.userService.userArray(res).subscribe((res1) =>{
        this.userArray = res1
        console.log(res1)
      })
    });

   
  }

  showAttendance(){
    if(this.user.role === 'admin'){
      return false
    }if(this.user.role === 'teacher'){
      return false
    }
    else{
      return true
    }
  }

  getTitleCase(key:any){
    this.userService.getTitleCase(key).subscribe((res) =>{
      this.keyTitle = res
    })
    return this.keyTitle
  }

 
}
