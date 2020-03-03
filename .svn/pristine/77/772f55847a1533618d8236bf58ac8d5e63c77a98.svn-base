import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { MainFunctionModule } from './main-function/main-function.module';
import { NewProjectModule } from './new-project/new-project.module';
import { PublicPartModule } from './public-part/public-part.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { httpInterceptorProviders } from './http-interceptors/index';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    MainFunctionModule,
    NewProjectModule,
    PublicPartModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
