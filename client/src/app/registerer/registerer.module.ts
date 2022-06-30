import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RegistererRoutingModule } from './registerer-routing.module';
import { RegistererComponent } from './registerer.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddPatientOverlayComponent } from './add-patient-overlay/add-patient-overlay.component';


@NgModule({
  declarations: [
    RegistererComponent,
    PatientsListComponent,
    ScheduleComponent,
    AddPatientOverlayComponent,
  ],
  imports: [
    CommonModule,
    RegistererRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegistererModule { }
