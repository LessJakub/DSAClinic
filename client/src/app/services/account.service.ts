import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRouteReuseStrategy } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import jwt_decode, { JwtPayload } from "jwt-decode";

type customJwtPayload = JwtPayload & { nameid: string, UserId: string, role: string};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    baseUrl: string = "http://localhost:8080/"
    loginUrl: string = this.baseUrl + "v1/Auth/login"

    constructor(private http: HttpClient) {
        const localUserString = localStorage.getItem("user");
        if (localUserString != null) {
            const localUser = JSON.parse(localUserString);
            if (localUser != null) {
                this.currentUserSource.next(localUser);
            }
        }
    }

    private currentUserSource = new ReplaySubject<User>()

    currentUser$ = this.currentUserSource.asObservable();

    private role: string;

    loginRequest(model: any) {
        return this.http.post(this.loginUrl, model).pipe (
            map((Response: User) => {
                const user = Response

                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    this.currentUserSource.next(user);

                    this.role = jwt_decode<customJwtPayload>(user.token).role;
                }
                console.log(user);
            })
        )
    }

    logoutUser() {
        localStorage.removeItem("user");
        this.currentUserSource.next(null);

        this.role = null;
    }

    getUserRole(): string {
        return this.role;
    }
}