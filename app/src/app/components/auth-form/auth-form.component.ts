import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/http/user/user.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  authForm: any;
  signUpForm:any
  isRegistered: boolean = true;
  formData: object = {};

  constructor(private userService: UserService, private router: Router, private tokenService: TokenService) {}
  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]) ,
      password: new FormControl('',[Validators.required]),
      
    });
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    })
  }

  user: object = {};
  message:string=''

  signUp(){
    this.formData = this.signUpForm.value
    console.log(this.formData)
    this.userService.signup(this.formData).subscribe((res:any) =>{
      console.log(res)
      this.tokenService.store(res.token)
      this.router.navigate(['/profile']);
    })

  }

  authData(){
    this.formData = this.authForm.value;
    this.userService.login(this.formData).subscribe((res:any) => {
      if(res.success){
        this.message = 'Successfully logged in !!'
        this.tokenService.store(res.token)
      this.router.navigate(['/profile']);
      }else{
        this.message = "Check credentials !!"
      }  
  })
  }

  toggleIsRegistered() {
    this.isRegistered = !this.isRegistered;
  }


}
