import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountControlsComponent } from './account-controls/account-controls.component';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { PatientVisitsComponent } from './patient-visits/patient-visits.component';


@NgModule({
  declarations: [
    AccountControlsComponent,
    PatientDataComponent,
    PatientVisitsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountControlsComponent,
    PatientDataComponent,
    PatientVisitsComponent
  ]
})
export class SharedModule { }
