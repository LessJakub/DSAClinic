import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitDetailComponent } from './visit-detail/visit-detail.component';
import { PhysDetailsComponent } from './phys-details/phys-details.component';
import { LabCreateComponent } from './lab-create/lab-create.component';
import { PhysCreateComponent } from './phys-create/phys-create.component';


@NgModule({
  declarations: [
    DoctorComponent,
    VisitsComponent,
    VisitDetailComponent,
    PhysDetailsComponent,
    LabCreateComponent,
    PhysCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
