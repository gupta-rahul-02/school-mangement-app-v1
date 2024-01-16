import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  dataSource:any
  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.usersList.subscribe((res:any) => {
      this.dataSource =res.users.filter((user: any) => user.role === 'teacher')
      console.log( this.dataSource)
    })
  }

  displayedColumns: string[] = ['sr.no','name',"email","role","viewProfile"]
  viewProfile(element:any){
    console.log('Profile')
  }
}
