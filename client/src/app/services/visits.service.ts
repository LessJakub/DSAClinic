import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { VisitDetail } from '../shared/interfaces/visit-detail';
import { VisitGeneral } from '../shared/interfaces/visit-general';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  visitsG : VisitGeneral[];
  visitsD : VisitDetail[];


  private baseUrl: string = "http://" + location.hostname;
  private doctorVisitsUrl: string = this.baseUrl + ":8080/v1/Doctors/";
  private doctorVisitsEndUrl: string = "/visits";

  constructor(private http: HttpClient) {
    // this.visitsG = [
    //   {id: 0, date: new Date(2022, 7, 10, 13), doctor: "John Mullbury", patient: {id: 0, name: "Tom", surname: "Gangley", pesel: "012345678910"}, status: "Open", diagnosis: "ded"},
    //   {id: 1, date: new Date(2022, 7, 10, 14, 30), doctor: "John Mullbury", patient: {id: 1, name: "Tim", surname: "Gangley", pesel: "112345678910"}, status: "Closed", diagnosis: "RIP"},
    //   {id: 2, date: new Date(2022, 7, 10, 11), doctor: "John Mullbury", patient: {id: 2, name: "Thim", surname: "Gangley", pesel: "212345678910"}, status: "Closed", diagnosis: "F"},
    //   {id: 3, date: new Date(2022, 7, 10, 12, 15), doctor: "John Mullbury", patient: {id: 3, name: "Ben", surname: "Gangley", pesel: "312345678910"}, status: "Open", diagnosis: "f'up"}
    // ]

    // this.visitsD = [
    //   {general: this.visitsG[0], description: "Patient came in drunk, passed out after stepping through the door."},
    //   {general: this.visitsG[1], description: "Patient is green and makes gurgling sounds."},
    //   {general: this.visitsG[2], description: "Patient said he got ghosted on a tinder date."},
    //   {general: this.visitsG[3], description: "Patient took a pill in Ibiza to show Avicii he was cool."},
    // ]
   }

  getDoctorVisitsList(doctorId: number): Observable<VisitGeneral[]> {
    // return this.http.get<VisitGeneral[]>(this.doctorVisitsUrl + doctorId + this.doctorVisitsEndUrl).pipe(
    //   tap(elem => console.log(elem))
    // );
    let response = this.http.get<VisitGeneral[]>(this.doctorVisitsUrl + doctorId + this.doctorVisitsEndUrl);

    //a ridicioulus way to get the dates to work as dates... copies all fields apart from dates, where it makes new Date objects
    response = response.pipe(map((visits: VisitGeneral[]) => visits.map(
      (visit) => ({
        description: visit.description,
        diagnosis: visit.diagnosis,
        doctorId: visit.doctorId,
        finalizationTime: new Date(visit.finalizationTime),
        id: visit.id,
        patientId: visit.patientId,
        registrantId: visit.registrantId,
        registrationTime: new Date(visit.registrationTime),
        status: visit.status,
        visitTime: new Date(visit.visitTime)
      } as VisitGeneral))
      ))

    return response;
  }

  getPatientVisitsList(patientId: number) : VisitGeneral[] {
    return this.visitsG;
  }

  getVisit(visitId: number) : VisitDetail {
    return this.visitsD.find((elem) => {return elem.general.id == visitId});
  }

  updateVisit(visit: VisitDetail) {
    console.log("Updated visit...");
  }
}
