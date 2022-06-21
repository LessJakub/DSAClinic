import { Component, OnInit } from '@angular/core';
import { SchedulingService } from 'src/app/services/scheduling.service';

import { Doctor } from 'src/app/shared/interfaces/doctor';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  host: {'class' : 'grow flex flex-col items-center p-6 space-y-2'}
})
export class ScheduleComponent implements OnInit {

  constructor(private ss: SchedulingService) { }
  
  chosenDate: Date;

  dropdownVisibility: boolean;
  doctors: Doctor[];
  chosenDoctor: Doctor;

  //scheduledVisits: VisitSchedule[];

  timeSlots: Date[];

  ngOnInit(): void {
    this.dropdownVisibility = false;
    this.ss.getAllDoctors().subscribe(docs => this.doctors = docs);
    this.timeSlots = this.prepareTimeSlots(new Date(0, 0, 0, 8), new Date(0, 0, 0, 16), new Date(0, 0, 0, 0, 15));
  }

  setDate(stringDate: string): void {
    this.chosenDate = new Date(stringDate);
    this.getSchedule();
  }

  setDoctor(doctor: Doctor): void {
    this.dropdownVisibility = false;
    this.chosenDoctor = doctor;
    //console.log(`Chose: ${this.chosenDoctor.name} ${this.chosenDoctor.surname}`);
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