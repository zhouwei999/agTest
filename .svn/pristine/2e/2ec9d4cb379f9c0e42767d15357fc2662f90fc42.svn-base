import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  getLoadInfo(id){
    return this.http.get(`/huaguang/load?projectId=${id}&token=${sessionStorage.getItem('access_token')}`)
  }

  addLoadInfo(param){
    return this.http.post(`/huaguang/addLoad?&token=${sessionStorage.getItem('access_token')}`,param)
  }

  uploadExcel(param){
    return this.http.post(`/huaguang/uploadExcel?&token=${sessionStorage.getItem('access_token')}`,param)
  }

  constructor(public http:HttpClient) { 

  }
}
