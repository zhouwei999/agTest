import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class NewProjectService {  
  getUsers(
    pageIndex: number = 1,
    pageSize: number = 10,
    sortField: string,
    sortOrder: string, 
  ): Observable<{ results: [] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder); 
    return this.http.get<{ results: [] }>(`/huaguang/project?&token=${sessionStorage.getItem('access_token')}`, {
      params
    });
  }

  getProList(param,str){
    return this.http.get(`/huaguang/project?${str}&offset=${(param.pageIndex-1)*param.pageSize}&limit=${param.pageSize}&token=${sessionStorage.getItem('access_token')}`)
  }

  addPro(param){
    return this.http.get(`/huaguang/addProject?projectName=${param.proName}&projectDesc=${param.proDec}&token=${sessionStorage.getItem('access_token')}`)
  }

  delPro(id){
    return this.http.get(`/huaguang/delProject?projectId=${id}&token=${sessionStorage.getItem('access_token')}`)
  }

  searchUser(){
    return this.http.get(`/huaguang/user?&token=${sessionStorage.getItem('access_token')}`)
  }

  constructor(private http: HttpClient) {}
}