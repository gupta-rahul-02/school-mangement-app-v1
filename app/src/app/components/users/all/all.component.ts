import { Component } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent {
  constructor(private tokenService: TokenService, private userService:UserService){}

  token:string = ''
  user:any
  dataSource:any


  ngOnInit(): void {
    this.token = this.tokenService.retriveToken()
    this.userService.getUser(this.token).subscribe((res) =>{
       
      this.user = res
      console.log(this.user)
      if(this.user.role === 'admin'){
        this.userService.getUsers().subscribe((res)  => {
          this.userService.usersList.next(res)
        })
      }
    })
    this.userService.usersList.subscribe((res2:any) => {
      this.dataSource = res2.users
      console.log(this.dataSource)
    })
  }

  displayedColumns: string[] = ['sr.no','name',"email","role","viewProfile"]

  viewProfile(element:any){
    console.log('Profile')
  }
}
