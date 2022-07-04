import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from '../shared/interfaces/status';

import { VisitDetail } from '../shared/interfaces/visit-detail';
import { VisitGeneral } from '../shared/interfaces/visit-general';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  private baseURL: string = "http://" + location.hostname;
  private visitsQueryURL: string = this.baseURL + "/v1/Visits/q";
  private visitDetailURL: string = this.baseURL + "/v1/Visits/";
  private addVisitURL: string = this.baseURL + "/v1/Visits";

  constructor(private http: HttpClient,
              private as: AccountService) { }

  getDoctorVisitsList(doctorId: number, date: Date, status: number): Observable<VisitGeneral[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("doctorId", doctorId);
    if (date != null) {
        queryParams = queryParams.append("dateString", date.toJSON());
    }
    if(status != -1){
      queryParams = queryParams.append("status", status);
    }

    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    console.log("Some random log")
    let response = this.http.get<VisitGeneral[]>(
      this.visitsQueryURL,
      {headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token}), 
      params: queryParams}
      );

    //a ridicioulus way to get the dates to work as dates... copies all fields apart from dates, where it makes new Date objects
    response = response.pipe(
      map(
        (visits: VisitGeneral[]) => visits.map(
          (visit) => ({
            ...visit,
            date: new Date(visit.date)
          } as VisitGeneral))
      ),
      // sort ascending
      map((visits: VisitGeneral[]) => visits.sort((objA, objB) => objA.date.getTime() - objB.date.getTime()))
    )

    return response;
  }

  getPatientVisitsList(patientId: number) : Observable<VisitGeneral[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("patientId", patientId);

    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    let response = this.http.get<VisitGeneral[]>(
      this.visitsQueryURL,
      {headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token}), 
      params: queryParams}
      );

    //a ridicioulus way to get the dates to work as dates... copies all fields apart from dates, where it makes new Date objects
    response = response.pipe(
      map(
        (visits: VisitGeneral[]) => visits.map(
          (visit) => ({
            id: visit.id,
            doctorName: visit.doctorName,
            patientName: visit.patientName,
            date: new Date(visit.date),
            status: visit.status,
            diagnosis: visit.diagnosis
          } as VisitGeneral)
        )
      ),
      // sort descending
      map((visits: VisitGeneral[]) => visits.sort((objA, objB) => objB.date.getTime() - objA.date.getTime())))

    return response;
  }

  getVisit(visitId: number) : Observable<VisitDetail> {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    let response = this.http.get<VisitDetail>(this.visitDetailURL + visitId.toString(), {headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token})});
    
    
    //a ridicioulus way to get the dates to work as dates... copies all fields apart from dates, where it makes new Date objects
    response = response.pipe(map(
      (visit) => ({
        ...visit,
        registrationTime: new Date(visit.registrationTime),
        finalizationTime: visit.finalizationTime? new Date(visit.finalizationTime) : null,
        visitTime: new Date(visit.visitTime)
      } as VisitDetail))
    )

    return response;
  }

  cancelVisit(visit: VisitDetail): Observable<boolean> {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    const body = {
      'description': visit.description,
      'diagnosis': visit.diagnosis,
      'status': Status.CANCELLED
    };

    var subject = new Subject<boolean>();

    this.http.put<any>(
      this.visitDetailURL + visit.id.toString(),
      body,
      {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
          console.log('Visit cancelled');
          subject.next(true);
        },
        error: error => {
          console.error('There was an error!', error);
          subject.next(false);
        }
    });
    return subject.asObservable();
  }

  finishVisit(visit: VisitDetail): void {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    const body = {
      'description': visit.description,
      'diagnosis': visit.diagnosis,
      'status': Status.FINISHED,
    };

    console.log(body);

    this.http.put<any>(
      this.visitDetailURL + visit.id.toString(),
      body,
      {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
          console.log('Visit finalized');
        },
        error: error => {
            console.error('There was an error finalizing the visit!', error);
        }
    });
  }

  addVisit(date: Date, doctorID: number, patientID: number): Observable<boolean> {

    let token: string;
    this.as.currentUser$.subscribe(user => token = user?.token);

    date.setSeconds(0, 0);

    const body = {
        "description": '',
        "visitTime": date.toJSON(),
        "status": 0,
        "doctorId": doctorID,
        "patientId": patientID
    }

    var subject = new Subject<boolean>();

    this.http.post<any>(this.addVisitURL,
      body,
      {headers: new HttpHeaders({'Content-Type': 'application/json-patch+json', 'Authorization': "Bearer " + token})}
    ).subscribe({
        next: data => {
          console.log('Visit registered');
          subject.next(true);
          //window.alert('Visit registered');
        },
        error: error => {
          console.error('There was an error finalizing the visit!', error);
          subject.next(false);
          window.alert('Error: Visit registration failed');
        }
      }
    );
    return subject.asObservable();
  }
}
