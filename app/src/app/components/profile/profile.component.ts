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

  ngOnInit(): void {
    this.token = this.tokenService.retriveToken();
    this.userService.getUser(this.token).subscribe((res) => {
      this.user = res;
      this.userService.userRole.next(this.user.role)
      this.userArray = Object.keys(this.user)
        .filter((key) => !this.propsToRemove.includes(key))
        .map((key) => ({ [key]: this.user[key] }));
        console.log(this.userArray)
        console.log(typeof this.user.attendance)
    });
  }

  
  getTitleCase(key:any) :string {
    if(typeof key === 'string'){
      return (key as string).charAt(0).toUpperCase() + key.slice(1).toLowerCase();
    }else{
      return 'Unknown'
    }
  }

 
}
