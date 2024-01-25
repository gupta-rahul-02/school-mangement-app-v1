import { Component , Inject, Injectable} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  constructor(private dialogRef:  MatDialogRef<PopupComponent>,@Inject(MAT_DIALOG_DATA) public  data:  any){}

  public  closeMe() {
    this.dialogRef.close();
}
}
