import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class LoginService { 
  login(param){
    let key = CryptoJS.enc.Utf8.parse("ENGIPOWEENGIPOWE");
    let password = CryptoJS.enc.Utf8.parse(param.password);
    let encrypted = CryptoJS.AES.encrypt(password, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    let encryptedPwd = encrypted.toString();

    let loginParam = {userName:param.userName, password:encryptedPwd} 
    return this.http.post(`/huaguang/login?`,loginParam)
  }

  addUser (param){
    let key = CryptoJS.enc.Utf8.parse("ENGIPOWEENGIPOWE");
    let password = CryptoJS.enc.Utf8.parse(param.registerPassword);
    let encrypted = CryptoJS.AES.encrypt(password, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    let encryptedPwd = encrypted.toString();

    let addUserParam = {userName:param.registerUserName, password:encryptedPwd, mobile:param.registerPhoneNum} 
    return this.http.post(`/huaguang/addUser`,addUserParam)
  }

  constructor(
    public http:HttpClient
  ) { }
}
