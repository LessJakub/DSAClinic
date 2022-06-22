import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Doctor } from '../shared/interfaces/doctor';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  private baseURL: string = "http://" + location.hostname;
  private queryDoctorsURL: string = this.baseURL + ":8080/v1/Doctors";

  constructor(private http: HttpClient,
              private as: AccountService) { }

  getAllDoctors() : Observable<Doctor[]> {
    
    let token: string;
    this.as.currentUser$.subscribe(user => token = user.token);

    return this.http.get<Doctor[]>(this.queryDoctorsURL,
      { headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token}) }
    );
  }
}
