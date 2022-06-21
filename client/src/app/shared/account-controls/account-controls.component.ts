import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-controls',
  templateUrl: './account-controls.component.html',
  styleUrls: ['./account-controls.component.css']
})
export class AccountControlsComponent implements OnInit {

    @Input() column: boolean = false;
    user: User;
    private afterLogoutURL: string = 'login';

    constructor(private accountService: AccountService,
                private router: Router) { }

    ngOnInit(): void {}

    logoutUser() {
        this.accountService.logoutUser();

        this.router.navigateByUrl(this.afterLogoutURL);
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
