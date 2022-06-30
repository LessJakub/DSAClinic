import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseRouteReuseStrategy } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { newUser } from '../shared/interfaces/newUser';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import jwt_decode, { JwtPayload } from "jwt-decode";

type customJwtPayload = JwtPayload & { nameid: string, UserId: number, role: string};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    baseUrl: string = "http://localhost:8080/";
    loginUrl: string = this.baseUrl + "v1/Auth/login";
    createUserURL: string = this.baseUrl + "v1/Auth/register";

    private currentUserSource = new ReplaySubject<User>()
    currentUser$ = this.currentUserSource.asObservable();

    private role: string;
    private isLoggedIn: boolean = false;

    constructor(private http: HttpClient) {
        const localUserString = localStorage.getItem("user");
        if (localUserString != null) {
            const localUser = JSON.parse(localUserString);
            if (localUser != null) {
                this.currentUserSource.next(localUser);
                this.role = jwt_decode<customJwtPayload>(localUser.token).role;
                this.isLoggedIn = true;
            }
        }
    }

    loginRequest(model: any) {
        return this.http.post(this.loginUrl, model).pipe (
            map((Response: User) => {
                const user = Response

                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    this.currentUserSource.next(user);

                    this.role = jwt_decode<customJwtPayload>(user.token).role;
                    this.isLoggedIn = true;
                    //console.log(jwt_decode<customJwtPayload>(user.token));
                }
                //console.log(user);
            })
        )
    }

    logoutUser() {
        localStorage.removeItem("user");
        this.currentUserSource.next(null);

        this.role = null;
        this.isLoggedIn = false;
    }

    getUserRole(): string {
        return this.role;
    }

    getLoggedInState(): boolean {
        return this.isLoggedIn;
    }

    createUser(newUser: newUser): Observable<boolean> {
        let token: string;
        this.currentUser$.subscribe(user => token = user?.token);

        const body = {
            "username": newUser.username,
            "password": newUser.password,
            "name": newUser.name,
            "surname": newUser.surname,
            "role": newUser.role
        }

        console.log(body);

        var subject = new Subject<boolean>();

        this.http.post<any>(this.createUserURL,
            body,
            {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
        ).subscribe({
            next: data => {
                console.log('User registered');
                subject.next(true);
                //window.alert('User registered');
            },
            error: error => {
                console.error('There was an error registering the user!', error);
                subject.next(false);
                window.alert('Error: User registration failed');
            }
        });
        return subject.asObservable();
    }
}