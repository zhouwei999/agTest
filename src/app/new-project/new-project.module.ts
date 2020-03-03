import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewProjectRoutingModule } from './new-project-routing.module';
import { CreateProjectComponent } from './create-project/create-project.component';
import { HistoryProjectComponent } from './history-project/history-project.component';
import { NewProjectComponent } from './new-project.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { PublicPartModule } from '../public-part/public-part.module';

@NgModule({
  declarations: [CreateProjectComponent, HistoryProjectComponent, NewProjectComponent],
  imports: [
    CommonModule,
    NewProjectRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NzDividerModule,
    PublicPartModule
  ]
})
export class NewProjectModule { }
