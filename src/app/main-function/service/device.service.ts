import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  getDeviceInfo(param){
    return this.http.get(`/huaguang/equipment?projectId=${param.projectId}&token=${sessionStorage.getItem('access_token')}`)
  }

  addEquipment(param,type){ 
    if(type)  return this.http.post(`/huaguang/addEquipment?&token=${sessionStorage.getItem('access_token')}`,param)
    else  return this.http.post(`/huaguang/updateEquipment?&token=${sessionStorage.getItem('access_token')}`,param)
  }

  updateEquipmentEquipment(param){
    return this.http.post(`/huaguang/updateEquipment?&token=${sessionStorage.getItem('access_token')}`,param)
  }

  calcresult(param){
    return this.http.get(`/huaguang/calcresult?projectId=${param.projectId}&token=${sessionStorage.getItem('access_token')}`)
  }

  constructor(public http:HttpClient) { }
}
