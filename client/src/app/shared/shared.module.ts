import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountControlsComponent } from './account-controls/account-controls.component';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { PatientVisitsComponent } from './patient-visits/patient-visits.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Page404Component } from './page404/page404.component';


@NgModule({
  declarations: [
    AccountControlsComponent,
    PatientDataComponent,
    PatientVisitsComponent,
    NavbarComponent,
    Page404Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountControlsComponent,
    PatientDataComponent,
    PatientVisitsComponent,
    NavbarComponent,
    Page404Component
  ]
})
export class SharedModule { }
