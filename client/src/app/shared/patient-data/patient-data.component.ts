import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css'],
  host: {'class' : 'grow flex flex-col justify-center p-6'}
})
export class PatientDataComponent implements OnInit {

  constructor() { }

  chosenPatientData: PatientData;

  ngOnInit(): void {
    this.chosenPatientData = {
      name: "Antonio",
      surname: "Brethwise",
      pesel: "0040215576"
    }
  }

}

interface PatientData {
  name: string,
  surname: string,
  pesel: string,
}