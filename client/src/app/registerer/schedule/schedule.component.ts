import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  host: {'class' : 'grow flex flex-col items-center p-6'}
})
export class ScheduleComponent implements OnInit {

  constructor() { }
  
  chosenDate: Date;

  dropdownVisibility: boolean;
  doctors: Doctor[];
  chosenDoctor: Doctor;

  ngOnInit(): void {
    this.dropdownVisibility = false;

    this.doctors = [
      {name: "Ben", surname: "Clinton"},
      {name: "John", surname: "Doe"},
      {name: "Bart", surname: "Simpson"},
      {name: "Ben", surname: "Clinton"},
      {name: "John", surname: "Doe"},
      {name: "Bart", surname: "Simpson"},
      {name: "Ben", surname: "Clinton"},
      {name: "John", surname: "Doe"},
      {name: "Bart", surname: "Simpson"},
      {name: "Ben", surname: "Clinton"},
      {name: "John", surname: "Doe"},
      {name: "Bart", surname: "Simpson"}
    ]
  }

  setDate(stringDate: string): void {
    this.chosenDate = new Date(stringDate);
    this.getSchedule();
  }

  setDoctor(doctor: Doctor): void {
    this.dropdownVisibility = false;
    this.chosenDoctor = doctor;
    console.log(`Chose: ${this.chosenDoctor.name} ${this.chosenDoctor.surname}`);
    this.getSchedule();
  }

  getSchedule(): void {
    //check if date and doctor were chosen and if date is valid
    if(this.chosenDate && this.chosenDate.getTime() == this.chosenDate.getTime() && this.chosenDoctor){
      console.log(`Getting schedule for doc ${this.chosenDoctor.name} ${this.chosenDoctor.surname} at ${this.chosenDate.toDateString()}...`);
    }
  }

}

interface Doctor {
  name: string,
  surname: string
}