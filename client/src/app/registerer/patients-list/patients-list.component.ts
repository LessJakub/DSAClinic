import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';

import { PatientData } from 'src/app/shared/interfaces/patient-data';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
  host: {'class' : 'basis-full min-h-0'}
})
export class PatientsListComponent implements OnInit {

  constructor(private ps: PatientsService) { }

  patientsSearched: PatientData[];
  @Output() selectedPatient = new EventEmitter<PatientData>();

  ngOnInit(): void {  }

  search(pattern: string): void {
      this.ps.getAllPatients(pattern).subscribe(result => this.patientsSearched = result);
      console.log(this.patientsSearched);
  }

  onSelect(patient: PatientData): void {
    this.selectedPatient.emit(patient);
  }
}
