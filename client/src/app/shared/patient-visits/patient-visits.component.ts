import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css'],
  host: {'class' : 'grow flex flex-col p-6'}
})
export class PatientVisitsComponent implements OnInit {

  constructor() { }

  visits: Visit[];

  ngOnInit(): void {
    this.visits = [
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'},
      {date: new Date('10-07-2022'), doctor: 'John Doe', status: 'Closed'}
    ]
  }

}

interface Visit {
  date: Date,
  doctor: String, //doctors needed in common module
  status: string  //could use some enum
}