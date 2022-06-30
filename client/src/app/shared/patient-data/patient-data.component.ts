import { Component, OnInit, Input } from '@angular/core';

import { PatientData } from '../interfaces/patient-data';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css'],
  host: {'class' : 'grow flex flex-col justify-center p-6'}
})
export class PatientDataComponent implements OnInit {

  constructor() { }

  @Input() chosenPatientData: PatientData;

  ngOnInit(): void {
    if(this.chosenPatientData == null){
      this.chosenPatientData = {
        id: 1,
        name: "Default Name",
        surname: "Default Surname",
        pesel: "0040215576"
      }
    }
  }

}