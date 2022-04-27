import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RegistererRoutingModule } from './registerer-routing.module';
import { RegistererComponent } from './registerer.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  declarations: [
    RegistererComponent,
    PatientsListComponent,
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    RegistererRoutingModule,
    SharedModule,
  ]
})
export class RegistererModule { }
