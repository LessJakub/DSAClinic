import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistererComponent } from './registerer.component';

const routes: Routes = [{ path: '', component: RegistererComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistererRoutingModule { }
