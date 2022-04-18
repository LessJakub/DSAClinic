import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountControlsComponent } from './account-controls/account-controls.component';


@NgModule({
  declarations: [
    AccountControlsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountControlsComponent
  ]
})
export class SharedModule { }
