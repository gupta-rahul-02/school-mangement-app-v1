import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AppService } from 'src/app/services/application/app.service';
import { AttendanceService } from 'src/app/services/http/attendance/attendance.service';
import { UserService } from 'src/app/services/http/user/user.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  selectedDate: string = '';
  dataSource: any;
  minDate: Date;
  maxDate: Date;
  displayedColumns: string[] = ['sr.no', 'name', 'email', 'status', 'view'];
  isDateSelected: boolean = true;
  presentCount: number = 0;
  absentCount: number = 0;

  constructor(
    private userService: UserService,
    private attendanceService: AttendanceService,
    private datePipe: DatePipe,
    private appService:AppService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.userService.usersList.next(res);
    });
    this.userService.usersList.subscribe((res2: any) => {
      this.dataSource = res2.users
        .filter((user: any) => user.role === 'student')
        .map((user: any) => {
          return {
            ...user,
            isPresentButtonDisabbled: false,
            isAbsentButtonDisabbled: false,
          };
        });
    });
  }

  onDateSelected() {
    console.log('true 1 ------')
    var date = new Date(this.selectedDate);
    if(this.isAllowed(date)){
      console.log('true -----')
      this.dataSeed(true)
      this.dataSource.isPresentButtonDisabbled = true
      this.dataSource.isAbsentButtonDisabbled = true
      return
    }
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    this.selectedDate = [date.getFullYear(), month, day].join('-');
   
    let dateCopy = this.formateDate(this.selectedDate);
    this.isDateSelected = false;
    this.dataSeed(false)
    this.dataSource.map((data: any) => {
      data.attendance.map((atttendData: any) => {
        if (atttendData.date === dateCopy) {
          if (atttendData.status === 'absent') {
            data.isAbsentButtonDisabbled = true;
          } else if (atttendData.status === 'present') {
            data.isPresentButtonDisabbled = true;
          }
        }
      });
    });
  }

  formateDate(dateString: string): string {
    const date = new Date(dateString);
    date.setUTCHours(0, 0, 0, 0);
    const newdate = date.toISOString();
    return newdate;
  }

  viewProfile(element:any){
    this.userService.user.next(element)
  }
  dataSeed(flag:boolean){
    // let dateCopy = this.formateDate(this.selectedDate);
    // this.isDateSelected = false;
    this.userService.usersList.subscribe((res2: any) => {
      this.dataSource = res2.users
        .filter((user: any) => user.role === 'student')
        .map((user: any) => {
          return {
            ...user,
            isPresentButtonDisabbled: flag,
            isAbsentButtonDisabbled: flag,
          };
        });
    });
    console.log(this.dataSource)
  }

  isAllowed(inputDate:Date){
   
    let day = inputDate.toString().substring(0,3)
   
    let date = inputDate.toString().substring(7,10)
    
    let month = inputDate.toString().substring(4,8)
   
    let today:any = new Date
    let presentMonth = today.toString().substring(4,8)
    today = today.toString().substring(7,10)
    
    
    if(day==='Sun'){
      return true
    }
    if(parseInt(date) > today || month !== presentMonth){
      return true
    }
    if(parseInt(date) < today-7 && month === presentMonth){
      
      return true
    }
    else{
      return false
    }
    
  }

  addAttendance(data:any,status:any){
    this.appService.addAttendance(data,status,this.selectedDate)

  }
  // addAttendance(data: any, status: any) {
  //   console.log(this.selectedDate.length)
   
  //   let attendanaceData = {
  //     email: data.email,
  //     status: status,
  //     date: this.selectedDate,
  //   };
  //   if (status === 'present') {
  //     data.isPresentButtonDisabbled = true;
  //     data.isAbsentButtonDisabbled = false;
  //   } else {
  //     data.isAbsentButtonDisabbled = true;
  //     data.isPresentButtonDisabbled = false;
  //   }
  //   this.attendanceService.addAttendance(attendanaceData).subscribe((res) => {
    
  //   });
  // }
}
