import { DatePipe } from '@angular/common';
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
  isDateSelected:boolean = true
  presentCount:number =0
  absentCount:number =0

constructor(private userService:UserService, private attendanceService:AttendanceService, private datePipe:DatePipe){
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
      this.dataSource = res2.users.filter((user:any) => user.role ==='student').map((user:any) =>{
        return {
          ...user,
          isPresentButtonDisabbled:false,
          isAbsentButtonDisabbled:false
        }
      })
       console.log(this.dataSource)
    })
  }
  onDateSelected(){
   console.log(this.selectedDate)
   var date  = new Date(this.selectedDate)
   var month = ("0" + (date.getMonth() + 1)).slice(-2)
   var day = ("0" + (date.getDate())).slice(-2);
   this.selectedDate = [date.getFullYear(),month,day].join("-")
   let dateCopy = this.formateDate(this.selectedDate)
   console.log(dateCopy)
   let dateData = {date: this.selectedDate}
  //  this.attendanceService.getUserListOfSpecificdate(dateData).subscribe((res:any) =>{
  //   console.log(res.response)
  //   this.dataSource = res.response
  //  })
   this.isDateSelected = false
   this.dataSource.map((data:any) =>{
    data.attendance.map((atttendData:any) =>{
      if(atttendData.date === dateCopy){
        console.log(atttendData)
        if(atttendData.status === 'absent'){
          data.isAbsentButtonDisabbled = true
        }else if(atttendData.status === 'present'){
          data.isPresentButtonDisabbled = true
        }
        
      }
    })
   })

  }

  formateDate(dateString:string):string {
    // const date = new Date(dateString)
    // return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSSZ') || '';
    const date = new Date(dateString);
    date.setUTCHours(0,0,0,0);
    const newdate =  date.toISOString()
    console.log(newdate)
    return newdate
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
      element.isPresentButtonDisabbled = true
      element.isAbsentButtonDisabbled = false
    }else{
      this.absentCount = 1
      this.presentCount =0
      element.isAbsentButtonDisabbled = true
      element.isPresentButtonDisabbled = false
    }
    console.log(attendanaceData)
    this.attendanceService.addAttendance(attendanaceData).subscribe((res) =>{
      console.log(res)
    })
  }

 
}
