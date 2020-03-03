import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
export class UserActive {
  data:Object
}
@Injectable({
  providedIn: 'root'
})
export class MainFunctionService {

  constructor(public http:HttpClient,) {

  }

  changeNameDse(id,name, des){
    let dataStr = `projectId=${id}&projectName=${name}&projectDesc=${des}`;
    return this.http.get(
      `/huaguang/updateProject?${dataStr}&token=${sessionStorage.getItem('access_token')}`)
  }
}
