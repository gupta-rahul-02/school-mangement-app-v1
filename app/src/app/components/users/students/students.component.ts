import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  constructor(private userService:UserService){}

  dataSource:any
  ngOnInit(): void {
    this.userService.usersList.subscribe((res:any) => {
      this.dataSource =res.users.filter((user: any) => user.role === 'student')
      console.log( this.dataSource)
    })
  }

  displayedColumns: string[] = ['sr.no','name',"email","role","viewProfile"]
  viewProfile(element:any){
    console.log('Profile')
  }
}
