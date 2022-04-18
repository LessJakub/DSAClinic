import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: { 'class' : 'flex grow'}
})
export class AppComponent {
  title = 'app';

  constructor(public accountService: AccountService) {};
}