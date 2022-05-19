import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface radioSelection {
  name: string,
  value: string
}

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css'],
  host: {'class': 'grow flex flex-col p-10'}, // ! Styling host container to fill all avialable space
})
export class VisitsComponent implements OnInit {

  form = new FormGroup({
    filter: new FormControl('all', Validators.required),
    date: new FormControl()
  });
  list : Visit[];

  constructor() { }

  ngOnInit(): void {
    this.list = [
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

  getList(): void{
    if(this.form.valid){
      console.log(`Getting elements for date ${this.form.get("date").value} and filter ${this.form.get("filter").value}`);
    }
  }

}

interface Visit {
  date: Date,
  doctor: String, //doctors needed in common module
  status: string  //could use some enum
}