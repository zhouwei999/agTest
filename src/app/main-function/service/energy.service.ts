import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EnergyService {
  getEnergyInfo(param){
    return this.http.get(`/huaguang/energyprice?projectId=${param.projectId}&token=${sessionStorage.getItem('access_token')}`)
  }

  addEnergyprice(param){
    return this.http.post(`/huaguang/addEnergyprice?&token=${sessionStorage.getItem('access_token')}`,param)
  }

  constructor(public http:HttpClient) { }
}
