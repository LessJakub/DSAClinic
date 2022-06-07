import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { VisitDetail } from '../shared/interfaces/visit-detail';
import { VisitGeneral } from '../shared/interfaces/visit-general';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  private baseURL: string = "http://" + location.hostname;
  private visitsQueryURL: string = this.baseURL + ":8080/v1/Visits/q";
  private visitDetailURL: string = this.baseURL + ":8080/v1/Visits/";

  constructor(private http: HttpClient,
              private as: AccountService) { }

  getDoctorVisitsList(doctorId: number, date: Date): Observable<VisitGeneral[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("doctorId", doctorId);
    queryParams = queryParams.append("dateString", date.toJSON());

    let token: string;
    this.as.currentUser$.subscribe(user => token = user.token);

    let response = this.http.get<VisitGeneral[]>(
      this.visitsQueryURL,
      {headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token}), 
      params: queryParams}
      );

    //a ridicioulus way to get the dates to work as dates... copies all fields apart from dates, where it makes new Date objects
    response = response.pipe(map((visits: VisitGeneral[]) => visits.map(
      (visit) => ({
        id: visit.id,
        doctorName: visit.doctorName,
        patientName: visit.patientName,
        date: new Date(visit.date),
        status: visit.status,
        diagnosis: visit.diagnosis
      } as VisitGeneral))
      ))

    return response;
  }

  getPatientVisitsList(patientId: number) : Observable<VisitGeneral[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("patientId", patientId);

    let token: string;
    this.as.currentUser$.subscribe(user => token = user.token);

    let response = this.http.get<VisitGeneral[]>(
      this.visitsQueryURL,
      {headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token}), 
      params: queryParams}
      );

    //a ridicioulus way to get the dates to work as dates... copies all fields apart from dates, where it makes new Date objects
    response = response.pipe(map((visits: VisitGeneral[]) => visits.map(
      (visit) => ({
        id: visit.id,
        doctorName: visit.doctorName,
        patientName: visit.patientName,
        date: new Date(visit.date),
        status: visit.status,
        diagnosis: visit.diagnosis
      } as VisitGeneral))
      ))

    return response;
  }

  getVisit(visitId: number) : Observable<VisitDetail> {
    let token: string;
    this.as.currentUser$.subscribe(user => token = user.token);

    return this.http.get<VisitDetail>(this.visitDetailURL + visitId.toString(), {headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token})});
  }

  updateVisit(visit: VisitDetail) {
    console.log("Updated visit...");
  }
}
