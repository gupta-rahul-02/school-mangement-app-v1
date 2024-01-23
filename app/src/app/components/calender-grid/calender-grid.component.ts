import { Component, Input, OnInit } from '@angular/core';

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
  constructor(){
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
}
