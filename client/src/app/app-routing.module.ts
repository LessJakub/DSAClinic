import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedinRoleGuard } from './guards/loggedin-role.guard';

// import { CounterComponent } from './counter/counter.component';
// import { FetchDataComponent } from './fetch-data/fetch-data.component';
// import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'counter', component: CounterComponent },
  // { path: 'fetch-data', component: FetchDataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrant', loadChildren: () => import('./registerer/registerer.module').then(m => m.RegistererModule), canLoad: [LoggedinRoleGuard], data: {permitted: ['Registrant']} },
  { path: 'doctor', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule), canLoad: [LoggedinRoleGuard], data: {permitted: ['Doctor']} },
  { path: 'lab', loadChildren: () => import('./lab/lab.module').then(m => m.LabModule), canLoad: [LoggedinRoleGuard], data: {permitted: ['LabTechnician', 'LabSupervisor']} },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canLoad: [LoggedinRoleGuard], data: {permitted: ['Admin']} },
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
