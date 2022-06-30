import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LabRoutingModule } from './lab-routing.module';
import { LabComponent } from './lab.component';
import { SharedModule } from '../shared/shared.module';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { TechnicianComponent } from './technician/technician.component';


@NgModule({
  declarations: [
    LabComponent,
    SupervisorComponent,
    TechnicianComponent
  ],
  imports: [
    CommonModule,
    LabRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LabModule { }
