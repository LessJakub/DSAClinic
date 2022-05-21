import { Injectable } from '@angular/core';

import { VisitDetail } from '../shared/interfaces/visit-detail';
import { VisitGeneral } from '../shared/interfaces/visit-general';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {


  visitsG : VisitGeneral[];
  visitsD : VisitDetail[];

  constructor() {
    this.visitsG = [
      {id: 0, date: new Date(2022, 7, 10, 13), doctor: "John Mullbury", patient: "Tom Gangley", status: "Open", diagnosis: "ded"},
      {id: 1, date: new Date(2022, 7, 10, 14, 30), doctor: "John Mullbury", patient: "Tom Gangley", status: "Closed", diagnosis: "RIP"},
      {id: 2, date: new Date(2022, 7, 10, 11), doctor: "John Mullbury", patient: "Tom Gangley", status: "Closed", diagnosis: "F"},
      {id: 3, date: new Date(2022, 7, 10, 12, 15), doctor: "John Mullbury", patient: "Tom Gangley", status: "Open", diagnosis: "f'up"}
    ]

    this.visitsD = [
      {general: this.visitsG[0], description: "Patient came in drunk, passed out after stepping through the door."},
      {general: this.visitsG[1], description: "Patient is green and makes gurgling sounds."},
      {general: this.visitsG[2], description: "Patient said he got ghosted on a tinder date."},
      {general: this.visitsG[3], description: "Patient took a pill in Ibiza to show Avicii he was cool."},
    ]
   }

  getDoctorVisitsList(doctorId: number) : VisitGeneral[] {
    return this.visitsG;
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
