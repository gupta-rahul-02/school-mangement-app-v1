import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  dateConverter(dateString:any){
    const date = new Date(dateString);
    date.setUTCHours(0, 0, 0, 0);
    const newdate = date.toISOString();
    return newdate;
  }
}
