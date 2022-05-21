import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from '../shared/page404/page404.component';
import { DoctorComponent } from './doctor.component';
import { VisitDetailComponent } from './visit-detail/visit-detail.component';
import { VisitsComponent } from './visits/visits.component';

const routes: Routes = [
  { path: '', component: DoctorComponent, children: [
    { path: 'visit/:id', component: VisitDetailComponent },
    { path: 'doctor_name', component: VisitsComponent },
    { path: '**', component: Page404Component }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
