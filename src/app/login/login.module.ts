import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { RegisterComponent } from './register/register.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule }  from  '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
