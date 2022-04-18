import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public service: AccountService) { }

    ngOnInit(): void {}

    model: any = {}
    error: string = null;

    loginAction() {
        this.service.loginRequest(this.model).subscribe(Response => {
            console.log("Login action used.");
        }, error => {
            this.error = error.error;
            console.log(error);
        })
    }

}
