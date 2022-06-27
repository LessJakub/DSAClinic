import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Observable } from 'rxjs';

import { ExamLaboratory } from '../shared/interfaces/exam-laboratory';
import { ExamPhysical } from '../shared/interfaces/exam-physical';
import { Status } from '../shared/interfaces/status';
import { AccountService } from './account.service';

type customJwtPayload = JwtPayload & { nameid: string, UserId: number, role: string};

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  private baseURL: string = "http://" + location.hostname;
  private queryAllLabExamsURL: string = this.baseURL + ":8080/v1/Lab/status";
  private updateLabExamURL: string = this.baseURL + ":8080/v1/Lab/";

  //Doctor's visit detail endpoints
  private getVisitLabExamsURL: string = this.baseURL + ":8080/v1/Visits/lab-examinations/";
  private getVisitPhysExamsURL: string = this.baseURL + ":8080/v1/Visits/physical-examinations/";
  private createVisitPhysExamURL: string = this.baseURL + ":8080/v1/Doctors/{id}/visits/phy-tests"; //POST
  private createVisitLabExamURL: string = this.baseURL + ":8080/v1/Doctors/{id}/visits/lab-tests"; //POST

  constructor(private http: HttpClient,
              private as: AccountService) { }

  getLabExams(filter: Status): Observable<ExamLaboratory[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("status", filter);
    
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    return this.http.get<ExamLaboratory[]>(this.queryAllLabExamsURL,
      { headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token}),
        params: queryParams
      });
  }

  postLabExam(id: number, labNotes: string, status: number): void {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    const body = {
      'status': status,
      'labTestStatus': 0,
      'labNotes': labNotes? labNotes : null,
    };

    this.http.put<any>(
      this.updateLabExamURL + id.toString(),
      body,
      {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
          console.log('Lab Examination updated');
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
  }

  getVisitPhysicals(visitId: number) : Observable<ExamPhysical[]> {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    return this.http.get<ExamPhysical[]>(this.getVisitPhysExamsURL + visitId.toString(),
      { 
        headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token})
      });
  }

  getVisitLaboratory(visitId: number) : Observable<ExamLaboratory[]> {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    return this.http.get<ExamLaboratory[]>(this.getVisitLabExamsURL + visitId.toString(),
      { 
        headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token})
      });
  }

  addVisitPhysical(visitId: number, result: string, type: number) : void {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    const body = {
      "results": result,
      "visitsId": visitId,
      "examinationListId": type
    };

    let id;
    this.as.currentUser$.subscribe(user => id = Number(jwt_decode<customJwtPayload>(user?.token).UserId));
    //console.log(body);
    const address = this.createVisitPhysExamURL.replace("{id}", id);

    this.http.post<any>(
      address,
      body,
      {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
          console.log('Lab Examination updated');
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
  }

  addVisitLaboratory(visitId: number, notes: string, type: number) : void {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    let date = new Date();
    date.setHours(date.getHours() + date.getTimezoneOffset() / -60);

    const body = {
      "status": 0,
      "orderDate": date,
      "doctorNotes": notes,
      "examinationListId": type,
      "visitsId": visitId
    };

    let id;
    this.as.currentUser$.subscribe(user => id = Number(jwt_decode<customJwtPayload>(user.token).UserId));
    //console.log(id);
    const address = this.createVisitLabExamURL.replace("{id}", id);

    this.http.post<any>(
      address,
      body,
      {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
          console.log('Lab Examination updated');
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
  }
}
