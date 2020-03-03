import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainFunctionComponent } from "./main-function.component";
import { DeviceComponent } from './device/device.component';
import { EnergyComponent } from './energy/energy.component';
import { EnviromentComponent } from './enviroment/enviroment.component';
import { LoadComponent } from './load/load.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    component:MainFunctionComponent,
    children: [
      {
        path: 'device', component: DeviceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'energy', component: EnergyComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'enviroment', component: EnviromentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'load', component: LoadComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'result', component: ResultComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFunctionRoutingModule { }

export const routedComponents = [
  DeviceComponent,
  EnergyComponent,
  EnviromentComponent,
  LoadComponent,
  ResultComponent
];