import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabComponent } from './lab.component';

import { Page404Component } from '../shared/page404/page404.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { TechnicianComponent } from './technician/technician.component';

const routes: Routes = [
  { path: '', component: LabComponent, children: [
    { path: 'supervisor', component:  SupervisorComponent},
    { path: 'technician', component:  TechnicianComponent},
    { path: '**', component: Page404Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
