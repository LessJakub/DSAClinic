import { Component, OnInit } from '@angular/core';

import { Patient } from '../patient';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
  host: {'class' : 'basis-full min-h-0'}
})
export class PatientsListComponent implements OnInit {

  constructor() { }

  DBpatients: Patient[];
  patients: Patient[];
  selectedPatient: Patient;

  ngOnInit(): void {
    this.DBpatients = [
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'},
      {name: 'Ammelie', surname: 'Naghwar', pesel: '000123'},
      {name: 'Ben', surname: 'Clinton', pesel: '134557'}
    ]
  }

  search(pattern: string): void {
    this.patients =  this.DBpatients.slice(0, 20);
  }

  onSelect(patient: Patient): void {
    this.selectedPatient = patient;
  }
}
