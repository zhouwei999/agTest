import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { MainFunctionRoutingModule } from './main-function-routing.module';
import { MainFunctionComponent } from "./main-function.component";
import { EnviromentComponent } from './enviroment/enviroment.component';
import { EnergyComponent } from './energy/energy.component';
import { DeviceComponent } from './device/device.component';
import { ResultComponent } from './result/result.component';
import { LoadComponent } from './load/load.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import  {  FormsModule,ReactiveFormsModule  }  from  '@angular/forms';
import { PublicPartModule } from '../public-part/public-part.module'; 
import { NzTableModule } from 'ng-zorro-antd/table';
import { ScreencityPipe } from '../pipe/screencity.pipe';
@NgModule({
  declarations: [MainFunctionComponent, EnviromentComponent, EnergyComponent, DeviceComponent, ResultComponent, LoadComponent, ScreencityPipe],
  imports: [
    NzStepsModule,
    NzIconModule,
    CommonModule,
    MainFunctionRoutingModule,
    PublicPartModule,
    NzInputModule,
    NzButtonModule, 
    NzGridModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule
  ],
})

export class MainFunctionModule { }
