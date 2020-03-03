import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginByPhoneForm: FormGroup;
  showRegister = false
  isLoad = false
  isLoadregis = false;

  loginOrRegister(type): void{
    if(type == 1){
      this.showRegister = false;
    }else if(type == 2){
      // 注册
      this.showRegister = true;
    }
  }

  getCode(type): void {
    if(type === 1) {  // 登录
      this.loginByPhoneForm.controls.phoneNum.markAsDirty();
      this.loginByPhoneForm.controls.phoneNum.updateValueAndValidity();

      if(this.loginByPhoneForm.valid){

      }
    }
    else if(type === 2) {  // 注册
      this.registerForm.controls.registerPhoneNum.markAsDirty();
      this.registerForm.controls.registerPhoneNum.updateValueAndValidity();

      if(this.registerForm.valid){
        
      }
    }
  }

  submitForm(): void { 
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    
    if(this.loginForm.valid){
      this.isLoad = true;

      this.Api.login(this.loginForm.value)
      .subscribe(response => {  
        this.isLoad = false;

        if(response && response[200] ){
          sessionStorage.setItem('access_token', response[200]);
          sessionStorage.setItem('loginUser',JSON.stringify(this.loginForm.value))

          this.router.navigate(['/create-project']);
        }else{
          this.message.create("error", `登录失败！`);
        }
      });
    } 
  }
 
  submitPhoneForm(): void {
    for (const i in this.loginByPhoneForm.controls) {
      this.loginByPhoneForm.controls[i].markAsDirty();
      this.loginByPhoneForm.controls[i].updateValueAndValidity();
    }

    console.log(this.loginByPhoneForm.value)
    if(this.loginByPhoneForm.valid){

    }
  }

  submitRegisterForm(): void {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    } 
     
    if(this.registerForm.valid){
      this.isLoadregis = true;
      this.Api.addUser(this.registerForm.value)
      .subscribe(response => {  
        this.isLoadregis = false; 

        if(response && response[200] ){
          this.message.create("success", `注册成功！`);
          this.loginOrRegister(1) 
        }else{
          this.message.create("error", `注册失败！`);
        }
      });
    }
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.registerPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  checkPassword = (control: FormControl): { [s: string]: boolean } =>{
    const reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{6,20}$/
    if (!control.value) {
      return { required: true };
    } else if (!reg.test(control.value)) {
      return { regOk: true, error: true };
    }
    return {};
  }

  checkPhone = (control: FormControl): { [s: string]: boolean } =>{
    const reg = /^1[3456789]\d{9}$/
    if (!control.value) {
      return { required: true };
    } else if (!reg.test(control.value)) {
      return { phoneOk: true, error: true };
    }
    return {};
  }

  updateConfirmValidator(): void { 
    Promise.resolve().then(() => this.registerForm.controls.registerPassword2.updateValueAndValidity());
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private Api: LoginService,
    private message: NzMessageService
  ) { }

  ngOnInit() { 
    if(sessionStorage.getItem('access_token')){
      sessionStorage.setItem('access_token', null)
    }

    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]], 
    });

    this.loginByPhoneForm = this.fb.group({
      phoneNum: [null, [Validators.required,this.checkPhone]],
      code: [null, [Validators.required]], 
    });

    this.registerForm = this.fb.group({
      registerUserName: [null, [Validators.required]],
      registerPassword: [null, [Validators.required,this.checkPassword]], 
      registerPassword2: [null, [Validators.required,this.confirmationValidator]], 
      registerPhoneNum: [null, [Validators.required,this.checkPhone]],
      registerCode: [null, [Validators.required]], 
    });
  } 
}
