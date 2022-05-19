import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitDetailComponent } from './visit-detail/visit-detail.component';


@NgModule({
  declarations: [
    DoctorComponent,
    VisitsComponent,
    VisitDetailComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
