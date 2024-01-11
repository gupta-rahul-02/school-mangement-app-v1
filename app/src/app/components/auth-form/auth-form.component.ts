import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/http/user/user.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  authForm: any;
  isRegistered: boolean = false;
  formData: object = {};

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]) ,
      password: new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
    });
  }

  user: object = {};
  message:string=''

  authData() {
    this.formData = this.authForm.value;
    if (this.isRegistered) {
      this.userService.login(this.formData).subscribe((res:any) => {
        console.log(res)  
        if(res.success){
          this.message = 'Successfully logged in !!'
        }
        this.userService.user.next(res);
      });
    } else {
      this.userService.signup(this.formData).subscribe((res:any) => {
        console.log(res);
        if(res.success){
          this.message = 'Successfully signed up !!'
        }
        this.userService.user.next(res)
      });
      console.log(this.formData);
    }

    this.router.navigate(['/profile']);
  }

  toggleIsRegistered() {
    this.isRegistered = !this.isRegistered;
  }
}
