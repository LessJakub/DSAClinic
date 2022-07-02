import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Observable, Subject } from 'rxjs';

import { ExamLaboratory } from '../shared/interfaces/exam-laboratory';
import { ExamPhysical } from '../shared/interfaces/exam-physical';
import { ExamType } from '../shared/interfaces/exam-type';
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
  private queryExaminationTypesURL: string = this.baseURL + ":8080/v1/Lab/examination-types/q";
  private createExaminationTypeURL: string = this.baseURL + ":8080/v1/Examination"; // POST

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

  postLabExam(id: number, labNotes: string, cancellationNotes: string, status: number): Observable<boolean> {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    var subject = new Subject<boolean>(); 

    let body;
    if(status == 3) {
      body = {
        'status': status,
        'labTestStatus': 0,
        'labNotes': labNotes? labNotes : null,
        'cancelationReason': cancellationNotes
      };
    }
    else {
      body = {
        'status': status,
        'labTestStatus': 0,
        'labNotes': labNotes,
        'cancelationReason': null
      };
    }
    

    this.http.put<any>(
      this.updateLabExamURL + id.toString(),
      body,
      {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
          console.log('Lab Examination updated');
          subject.next(true);
        },
        error: error => {
            console.error('There was an error!', error);
            subject.next(false);
        }
    });
    return subject.asObservable();
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

  addVisitPhysical(visitId: number, result: string, type: number) : Observable<boolean> {
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

    var subject = new Subject<boolean>();

    this.http.post<any>(
      address,
      body,
      {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
          console.log('Lab Examination updated');
          subject.next(true);
        },
        error: error => {
          console.error('There was an error!', error);
          subject.next(false);
        }
    });
    return subject.asObservable();
  }

  addVisitLaboratory(visitId: number, notes: string, type: number) : Observable<boolean> {
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

    var subject = new Subject<boolean>();
    
    this.http.post<any>(
      address,
      body,
      {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
          console.log('Lab Examination updated');
          subject.next(true);
        },
        error: error => {
          console.error('There was an error!', error);
          subject.next(false);
        }
    });
    return subject.asObservable();
  }

  physTypeSearch(query: string) : Observable<ExamType[]> {

    let queryParams = new HttpParams();
    const regex : RegExp = /([\dEV]\d{2,4})|([A-Za-z]\d{2}[a-zA-Z0-9]{0,4})/gm;
    if(query.search(regex) == -1) {
      queryParams = queryParams.append("name", query);
    }
    else {
      queryParams = queryParams.append("icd", query);
    }

    queryParams = queryParams.append("type", 0);

    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    console.log(`Querying for ${queryParams}`);

    return this.http.get<ExamType[]>(this.queryExaminationTypesURL,
      { headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token}),
        params: queryParams
      });
  }

  labTypeSearch(query: string) : Observable<ExamType[]> {

    let queryParams = new HttpParams();
    const regex : RegExp = /([\dEV]\d{2,4})|([A-Za-z]\d{2}[a-zA-Z0-9]{0,4})/gm;
    if(query.search(regex) == -1) {
      queryParams = queryParams.append("name", query);
    }
    else {
      queryParams = queryParams.append("icd", query);
    }

    queryParams = queryParams.append("type", 1);

    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    console.log(`Querying for ${queryParams}`);

    return this.http.get<ExamType[]>(this.queryExaminationTypesURL,
      { headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token}),
        params: queryParams
      });
  }

  createType(newType: {'name': string, 'type': number, 'icd': string}): Observable<boolean> {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    var subject = new Subject<boolean>();

    this.http.post<any>(this.createExaminationTypeURL,
        newType,
        {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
            console.log('Type created');
            subject.next(true);
            //window.alert('User registered');
        },
        error: error => {
            console.error('There was an error creating type!', error);
            subject.next(false);
            window.alert('Error: Type creation failed');
        }
    });
    return subject.asObservable();
}
}
