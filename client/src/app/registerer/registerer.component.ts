import { Component, OnInit } from '@angular/core';
import { VisitsService } from '../services/visits.service';

import { PatientData } from '../shared/interfaces/patient-data';
import { VisitGeneral } from '../shared/interfaces/visit-general';

@Component({
  selector: 'app-registerer',
  templateUrl: './registerer.component.html',
  styleUrls: ['./registerer.component.css'],
  host: {'class': 'grow flex'}, // ! Styling host container to fill all avialable space
})
export class RegistererComponent implements OnInit {

  selectedPatient: PatientData;
  patientsVisits: VisitGeneral[];

  patientOverlayOn: boolean;

  constructor(private vs: VisitsService) { }

  ngOnInit(): void {

  }

  selectPatient(patient: PatientData): void {
    this.selectedPatient = patient;

    this.vs.getPatientVisitsList(this.selectedPatient.id).subscribe(result => 
      {
        this.patientsVisits = result;
        this.patientsVisits.forEach((visit, index, arr) => {
          arr[index].date = this.localizeDate(visit.date);
        })
        //console.log(this.patientsVisits[0]?.date.getTimezoneOffset());
      });
  }

  localizeDate(date: Date): Date {
    if (date == null) {
      return null;
    }
    let local = new Date(date);
    local.setHours(local.getHours() + local.getTimezoneOffset() / -60);

    //console.log(`Before: ${date} after: ${local}`);

    return local;
  }

}
