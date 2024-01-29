import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
 userArray:any
 keyTitle:any
 user:any
 noOfPresentDays:number =0
  noOfAbsentDays:number = 0
  
  ngOnInit(): void {
    this.userService.user.subscribe((res:any) =>{
      console.log(res)
      // delete res.isPresentButtonDisabbled
      // delete res.isAbsentButtonDisabbled
      this.user = res
      this.noOfPresentDays = this.user.attendance.filter((data:any) =>( data.status === 'present')).length
      this.noOfAbsentDays = this.user.attendance.length - this.noOfPresentDays
      this.userService.userArray(res).subscribe((res2) =>{
        console.log(res2)
        this.userArray = res2
      })

    } )
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
  constructor(private userService:UserService){}

}
