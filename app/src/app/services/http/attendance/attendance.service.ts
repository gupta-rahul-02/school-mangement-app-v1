import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  addAttendance(attendanaceData:any){
    console.log(attendanaceData)
    const sessionToken: any = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', sessionToken);
    const {email,status} = attendanaceData
    let url = `http://localhost:3000/api/v1/attendance/mark/${email}/${status}`
    console.log(url)
    return this.http.post(url,attendanaceData,{headers})
  }

  // getUserListOfSpecificdate(dateData:any){
  //   console.log(dateData)
  //   // console.log(dateData)
  //   const params = new HttpParams().set('date',dateData.date)
  //   return this.http.get('http://localhost:3000/api/v1/attendance/all',{params})
  // }
}
