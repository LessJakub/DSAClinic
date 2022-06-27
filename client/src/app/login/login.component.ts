import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var $: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: { 'class' : 'flex grow'}
})
export class LoginComponent implements OnInit {

    constructor(public service: AccountService,
                private router: Router,
                private http: HttpClient) { }

    ngOnInit(): void {};

    model: any = {};
    error: string = null;

    private redirects = {'Doctor': 'doctor/doctor_name', 'Registrant': 'registerer', 'LabTechnician': 'lab/technician', 'LabSupervisor': 'lab/supervisor'};
    
    loginAction() {
        this.service.loginRequest(this.model).subscribe(Response => {
            console.log("Login action used.");

            let tokenRole = this.service.getUserRole();
            console.log(tokenRole);


            if(tokenRole == "Admin")
            {
                //var url: any = "https://localhost:8081/admin";

                var tokenUser;
                this.service.currentUser$.subscribe((user: User) => {
                if(user != null)
                {
                    tokenUser = user.token;
                }})

                

                var params = {
                    Authorization: 'Bearer ' + tokenUser
                };

                //var url = ["https://localhost:8081/admin", $.param(params)].join('?');

                window.open("https://localhost:8081/admin");

                
                

                //this.router.navigate(url);
                //window.location.href="https://localhost:8081/admin";
                
            }
            else
            {
                this.router.navigate([this.redirects[tokenRole]]);
            }
           

        }, error => {
            this.error = error.error;
            console.log(error);
        })
    }

}
