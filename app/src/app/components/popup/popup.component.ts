import { Component, Inject, Injectable } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { AppService } from 'src/app/services/application/app.service';
import { UserService } from 'src/app/services/http/user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  constructor(
    private dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService,
    private userService:UserService,
    private router: Router
    
  ) {}

  public closeMe() {

    this.dialogRef.close();
    
    console.log('----')
  }

  viewProfile(element:any){
    console.log(element.attendance)
    this.userService.user.next(element)
    this.userService.user.subscribe((res:any) =>{
      console.log(res)
    })
    this.router.navigate(['/attendance'])
  }
  updateAttendance(data:any,status:any,date:any) {
     this.appService.addAttendance(data,status,date)
  }
}
