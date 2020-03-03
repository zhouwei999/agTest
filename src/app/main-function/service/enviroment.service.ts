import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
export class UserActive {
  data:Object
}
@Injectable({
  providedIn: 'root'
})
export class EnviromentService {

  constructor(public http:HttpClient) { }

  requestWeather(site){
    return this.http.get(`/huaguang/weather?location=${site}&token=${sessionStorage.getItem('access_token')}`)
  }
  requestCity(){
    return this.http.get(`/huaguang/geoName?token=${sessionStorage.getItem('access_token')}`)
  }
  saveToDataBase(data){
    return this.http.post< UserActive >(
      `/huaguang/addWeather?token=${sessionStorage.getItem('access_token')}`,
      data,
    )
  }
  uploadExcel(param){
    return this.http.post(`/huaguang/uploadExcel?&token=${sessionStorage.getItem('access_token')}`,param)
  }
}
