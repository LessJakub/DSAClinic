import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountControlsComponent } from './account-controls/account-controls.component';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { PatientVisitsComponent } from './patient-visits/patient-visits.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Page404Component } from './page404/page404.component';
import { LabDetailsComponent } from './lab-details/lab-details.component';


@NgModule({
  declarations: [
    AccountControlsComponent,
    PatientDataComponent,
    PatientVisitsComponent,
    NavbarComponent,
    Page404Component,
    LabDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AccountControlsComponent,
    PatientDataComponent,
    PatientVisitsComponent,
    NavbarComponent,
    Page404Component,
    LabDetailsComponent
  ]
})
export class SharedModule { }
