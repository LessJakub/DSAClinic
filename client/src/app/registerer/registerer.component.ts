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

    this.vs.getPatientVisitsList(this.selectedPatient.id).subscribe(result => this.patientsVisits = result);
  }

}
