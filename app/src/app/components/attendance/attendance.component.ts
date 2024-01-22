import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AttendanceService } from 'src/app/services/http/attendance/attendance.service';
import { UserService } from 'src/app/services/http/user/user.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  selectedDate:string =''
  dataSource:any
  minDate:Date
  maxDate:Date
  displayedColumns: string[] = ['sr.no','name',"email","status"]
  isDateSelected:boolean = false
  presentCount:number =0
  absentCount:number =0
  presentButtonDisable:boolean=false
  absentButtonDisable:boolean=false
constructor(private userService:UserService, private attendanceService:AttendanceService){
  const currentYear = new Date().getFullYear();
  this.minDate = new Date(currentYear - 1,0,1);
  this.maxDate = new Date(currentYear + 1, 11, 31);
}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userService.getUsers().subscribe((res) =>{
      this.userService.usersList.next(res)
    })
    this.userService.usersList.subscribe((res2:any) => {
      this.dataSource = res2.users.filter((user:any) => user.role ==='student')
      console.log(this.dataSource)
    })
  }
  onDateSelected(){
   var date  = new Date(this.selectedDate)
   var month = ("0" + (date.getMonth() + 1)).slice(-2)
   var day = ("0" + (date.getDate())).slice(-2);
   this.selectedDate = [date.getFullYear(),month,day].join("-")
   this.isDateSelected = true
   console.log(this.selectedDate)
   console.log(this.isDateSelected)
  }

  

  addAttendance(element:any,status:any){
    console.log('frontend')
    let attendanaceData = {
      email :  element.email,
      status : status,
      date : this.selectedDate
    }
    if(status === 'present'){
      this.presentCount = 1
      this.absentCount =0
      this.presentButtonDisable = true
      this.absentButtonDisable = false
    }else{
      this.absentCount = 1
      this.presentCount =0
      this.absentButtonDisable = true
      this.presentButtonDisable = false
    }
    console.log(attendanaceData.date)
    this.attendanceService.addAttendance(attendanaceData).subscribe((res) =>{
      console.log(res)
    })
  }

 
}
