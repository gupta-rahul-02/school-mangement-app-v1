import { Injectable } from '@angular/core';
import { AttendanceService } from '../http/attendance/attendance.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private attendanceService:AttendanceService) { }

  dateConverter(dateString:any){
    const date = new Date(dateString);
    date.setUTCHours(0, 0, 0, 0);
    const newdate = date.toISOString();
    return newdate;
  }

  addAttendance(data:any,status:any,date:any){
    if(date.length > 10){
      date = this.dateConverter(date)
    }

    let attendanaceData = {
      email: data.email,
      status: status,
      date: date,
    }

    if (status === 'present') {
      data.isPresentButtonDisabbled = true;
      data.isAbsentButtonDisabbled = false;
    } else {
      data.isAbsentButtonDisabbled = true;
      data.isPresentButtonDisabbled = false;
    }

    this.attendanceService.addAttendance(attendanaceData).subscribe((res) => {
      console.log(res)
      return res
    });
  }
}
