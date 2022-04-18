import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-controls',
  templateUrl: './account-controls.component.html',
  styleUrls: ['./account-controls.component.css']
})
export class AccountControlsComponent implements OnInit {

    user: User

    constructor(private accountService: AccountService) { }

    ngOnInit(): void {}

    logoutUser() {
        this.accountService.logoutUser();
    }

    getUserName(): String {
        if (this.user == null) {
            this.accountService.currentUser$.subscribe(currentUser => this.user = currentUser);

            if (this.user == null) {
                return "Lucia Fernandez"
            }
        }
        return this.user.username;
    }

}
