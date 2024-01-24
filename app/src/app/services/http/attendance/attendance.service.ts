import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  addAttendance(attendanaceData:any){
    const sessionToken: any = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', sessionToken);
    const {email,status} = attendanaceData
    let url = `http://localhost:3000/api/v1/attendance/mark/${email}/${status}`
    return this.http.post(url,attendanaceData,{headers})
  }

 
}
