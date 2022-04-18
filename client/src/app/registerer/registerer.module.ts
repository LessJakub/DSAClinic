import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RegistererRoutingModule } from './registerer-routing.module';
import { RegistererComponent } from './registerer.component';
import { PatientsListComponent } from './patients-list/patients-list.component';


@NgModule({
  declarations: [
    RegistererComponent,
    PatientsListComponent,
  ],
  imports: [
    CommonModule,
    RegistererRoutingModule,
    SharedModule
  ]
})
export class RegistererModule { }
