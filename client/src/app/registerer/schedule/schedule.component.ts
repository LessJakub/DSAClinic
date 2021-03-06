import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SchedulingService } from 'src/app/services/scheduling.service';
import { UtilityService } from 'src/app/services/utility.service';
import { VisitsService } from 'src/app/services/visits.service';

import { Doctor } from 'src/app/shared/interfaces/doctor';
import { PatientData } from 'src/app/shared/interfaces/patient-data';
import { VisitGeneral } from 'src/app/shared/interfaces/visit-general';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  host: {'class' : 'grow flex flex-col items-center p-6 space-y-2'}
})
export class ScheduleComponent implements OnInit {

  constructor(private ss: SchedulingService,
              private vs: VisitsService,
              public us: UtilityService) { }

  @Input() chosenPatient: PatientData;
  @Output() stateChanged = new EventEmitter<boolean>();

  
  openingTime = new Date(0, 0, 0, 8);
  closingTime = new Date(0, 0, 0, 16);
  timeSlotLength = new Date(0, 0, 0, 0, 30);

  chosenDate: Date;

  dropdownVisibility: boolean;
  doctors: Doctor[];
  chosenDoctor: Doctor;

  scheduledVisits: VisitGeneral[][] = new Array(7);
  timeSlots: Date[];
  dateSlots: Date[] = [];
  chosenSlot: Date;
  chosenSlotID: slotID = {x: -1, y: -1};

  ngOnInit(): void {
    this.dropdownVisibility = false;
    this.timeSlots = this.prepareTimeSlots(this.openingTime, this.closingTime, this.timeSlotLength);
    this.ss.getAllDoctors().subscribe(docs => this.doctors = docs);
  }

  selectSlot(id: slotID):void {
    if(this.chosenSlotID.x == id.x && this.chosenSlotID.y == id.y) {
      this.chosenSlotID = {x: -1, y: -1};
      this.chosenSlot = null;
    }
    else {
      this.chosenSlotID = id;
      this.chosenSlot = new Date(this.dateSlots[id.x]);
      this.chosenSlot.setHours(this.timeSlots[id.y].getHours());
      this.chosenSlot.setMinutes(this.timeSlots[id.y].getMinutes());
    }

    console.log(`Chosen slot: ${this.us.prettyDateFromDate(this.chosenSlot)} ${this.us.prettyTimeFromDate(this.chosenSlot)} and id ${this.chosenSlotID.x} ${this.chosenSlotID.y}`)
  }

  registerVisit(): void {
    if(this.chosenSlot != null && this.chosenPatient) {
      this.vs.addVisit(this.chosenSlot, this.chosenDoctor.id, this.chosenPatient.id).subscribe( result => {
        if(result) {
          this.getSchedule();
          this.stateChanged.emit(true);
        }
      });

      this.chosenSlotID = {x: -1, y: -1};
      this.chosenSlot = null;
    }
    else {
        alert("Please select patient and a timeslot.")
    }
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
      
      this.scheduledVisits = new Array(7);
      this.dateSlots = [];
      
      // Get the chosen date and +- 3 days
      let date = new Date(this.chosenDate);
      date.setDate(date.getDate() - 3);
      this.dateSlots.push(date);
      
      for(let i = 0; i < 7; i++){

        this.vs.getDoctorVisitsList(this.chosenDoctor?.id, this.dateSlots[i], 0).subscribe(visits => {
          this.scheduledVisits[i] = visits;
          this.scheduledVisits[i].forEach((visit, index, arr) => {
            arr[index].date = this.us.localizeDate(visit.date);
          });

          for(let n = 0; n < this.timeSlots.length; n++){
            if(this.scheduledVisits[i][n] && 
              this.us.prettyTimeFromDate(this.scheduledVisits[i][n].date) == this.us.prettyTimeFromDate(this.timeSlots[n])){
              // the element is in the correct slot
            }
            else {
              // move all elements by one, insert null in the current time slot
              this.scheduledVisits[i].splice(n, 0, null);
            }
          }
          //console.log(this.scheduledVisits);
        });
        date = new Date(this.dateSlots[i]);
        date.setDate(date.getDate() + 1);
        this.dateSlots.push(date);
      }
      // i dont want to rethink the flow of this loop, so just remove the last unnecessary date
      this.dateSlots.pop();
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

}

interface slotID {
  x: number,
  y: number
}