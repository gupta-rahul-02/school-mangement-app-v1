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
  ngOnInit(): void {
    this.userService.user.subscribe((res:any) =>{
      console.log(res)
      this.user = res
      this.userService.userArray(res).subscribe((res2) =>{
        this.userArray = res2
      })

    } )
  }

  getTitleCase(key:any){
    this.userService.getTitleCase(key).subscribe((res) =>{
      this.keyTitle = res
    })
    return this.keyTitle
  }
  constructor(private userService:UserService){}

}
