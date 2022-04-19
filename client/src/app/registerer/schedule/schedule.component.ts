import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  host: {'class' : 'grow flex flex-col items-center p-6 space-y-2'}
})
export class ScheduleComponent implements OnInit {

  constructor() { }
  
  chosenDate: Date;

  dropdownVisibility: boolean;
  doctors: Doctor[];
  chosenDoctor: Doctor;

  scheduledVisits: VisitSchedule[];

  timeSlots: Date[];

  ngOnInit(): void {
    this.dropdownVisibility = false;

    this.timeSlots = this.prepareTimeSlots(new Date(0, 0, 0, 8), new Date(0, 0, 0, 16), new Date(0, 0, 0, 0, 15));

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

    this.scheduledVisits = [
      {id: 0, time: new Date(2022, 4, 10, 10, 30)},
      {id: 1, time: new Date(2022, 4, 10, 11, 0)},
      {id: 2, time: new Date(2022, 4, 10, 12, 0)},
      {id: 3, time: new Date(2022, 4, 11, 8, 0)},
      {id: 4, time: new Date(2022, 4, 11, 9, 30)},
      {id: 5, time: new Date(2022, 4, 11, 10, 0)},
      {id: 6, time: new Date(2022, 4, 11, 10, 30)},
      {id: 7, time: new Date(2022, 4, 11, 11, 30)},
      {id: 8, time: new Date(2022, 4, 12, 8, 30)},
      {id: 9, time: new Date(2022, 4, 12, 10, 30)},
      {id: 10, time: new Date(2022, 4, 12, 11, 0)},
      {id: 11, time: new Date(2022, 4, 12, 12, 30)},
      {id: 12, time: new Date(2022, 4, 12, 13, 30)},
      {id: 13, time: new Date(2022, 4, 13, 10, 30)},
      {id: 14, time: new Date(2022, 4, 13, 8, 0)},
      {id: 15, time: new Date(2022, 4, 13, 13, 0)}
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

  prepareTimeSlots(opening: Date, closing: Date, slot: Date): Date[] {
    let times: Date[] = [];

    while(opening.getTime() != closing.getTime()) {
      times.push(new Date(opening));
      opening.setMinutes(opening.getMinutes() + slot.getMinutes());
    }

    return times;
  }

  prettyTimeFromDate(time: Date): string {
    return time.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    });
  }
}

interface Doctor {
  name: string,
  surname: string
}

interface VisitSchedule { // fetch open visits for a doctor for chosen day +- 4 days
  id: number,
  time: Date
}