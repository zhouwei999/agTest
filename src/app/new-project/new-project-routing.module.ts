import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewProjectComponent } from './new-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { HistoryProjectComponent } from './history-project/history-project.component';
import { AuthGuard } from '../auth/auth.guard';
const routes: Routes = [
  {
    path: "",
    component:NewProjectComponent,
    children: [
      {
        path: 'create-project', component: CreateProjectComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'history-project', component: HistoryProjectComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProjectRoutingModule { }
