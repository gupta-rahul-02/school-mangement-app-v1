import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/http/user/user.service';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent {
  constructor(private tokenService: TokenService, private userService:UserService, private readonly route:ActivatedRoute){}

  token:string = ''
  user:any
  dataSource:any
  role:any

  ngOnInit(): void {
    this.token = this.tokenService.retriveToken()
    this.userService.getUser(this.token).subscribe((res:any) =>{
      console.log(res)
      this.userService.userRole.next(res.role)
    })
    this.role = this.route.snapshot.paramMap.get('all')
    this.userService.buttonFlag.next(true);
    if(this.role === 'admin'){
      this.userService.usersList.subscribe((res2:any) => {
        this.dataSource = res2.users
        
      })
    }else if(this.role === 'student'){
      console.log('enter')
      this.userService.usersList.subscribe((res:any) => {
        this.dataSource =res.users.filter((user: any) => user.role === 'student')
        
      })
    }else if(this.role === 'teacher'){
      this.userService.usersList.subscribe((res:any) => {
        this.dataSource =res.users.filter((user: any) => user.role === 'teacher')
       
      })
    }
  }

  displayedColumns: string[] = ['sr.no','name',"email","role","viewProfile","removeUser"]

  viewProfile(element:any){
    this.userService.user.next(element)
    
  }

  removeUser(element:any){
    this.userService.delete(element.email).subscribe((res) =>{
      console.log(res)
    })
  }

  // addAttendance(element:any){
    
  // }
}
