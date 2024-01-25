import { Component, Input, OnInit } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material/dialog'
import { PopupComponent } from '../popup/popup.component';
import { AppService } from 'src/app/services/application/app.service';
@Component({
  selector: 'app-calender-grid',
  templateUrl: './calender-grid.component.html',
  styleUrls: ['./calender-grid.component.scss']
})
export class CalenderGridComponent implements OnInit{
  startDate!: Date;
  endDate!: Date;
  
  dates:Date[] = [];
  selectedMonth!: number;
  attendanceArray:any[] =[]
  constructor(private  dialog:  MatDialog, private appServices:AppService){
  }

  ngOnInit(): void {
    this.selectedMonth = 1;
    this.generateCalendar();
    this.attendanceArray = this.userData.attendance
  }

  @Input() userData:any

  generateCalendar() {
   this.startDate = new Date();
   this.startDate.setDate(1);
   this.startDate.setMonth(this.selectedMonth - 1);
   this.startDate.setFullYear(2024)
   console.log(this.selectedMonth)
   
   this.endDate = new Date();
   this.endDate.setMonth(this.startDate.getMonth() + 1);
   this.endDate.setDate(0); 
   this.dates = [];


   while (this.startDate <= this.endDate) {
    this.dates.push(new Date(this.startDate));
    this.startDate.setDate(this.startDate.getDate() + 1);
  }
  }

  getAttendanceStatus(date:Date):string{
    const forDate = new Date(date)
     forDate.setUTCHours(0,0,0,0)
    const formattedDate = forDate.toISOString()
    const attendance = this.attendanceArray.find((entry:any) =>
      entry.date === formattedDate);

    if(attendance){
      return attendance.status === 'present' ? 'present-cell' : 'absent-cell';
    }else{
      return 'empty-cell'
    }
  }

  openModal(date:any,userData:any){
    console.log(userData.attendance)
    
    console.log(date)
    date = this.appServices.dateConverter(date)

    const a = userData.attendance.filter((day:any) => day.date === date)
    console.log(a[0].status)
    if(a[0].status === 'present'){
      a[0].isPresentButtonDisabbled = true
    }else{
      a[0].isAbsentButtonDisabbled = true
    }
    
    console.log(a)
    this.dialog.open(PopupComponent,{data:{
      message:date,
      status:a[0]
    }})
  }
  
}
