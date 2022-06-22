import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ExaminationService } from 'src/app/services/examination.service';

import { ExamLaboratory } from '../interfaces/exam-laboratory';

@Component({
  selector: 'app-lab-details',
  templateUrl: './lab-details.component.html',
  styleUrls: ['./lab-details.component.css'],
  host: {'class': 'absolute top-0 left-0 w-full h-full z-50'}, // ! Styling host container to fill all avialable space
})
export class LabDetailsComponent implements OnInit {

  constructor(private es: ExaminationService) { }

  @Input()  active!: boolean;
  @Output() activeChange = new EventEmitter<boolean>();

  @Input() exam!: ExamLaboratory;
  @Input() editable!: boolean;

  labNotes: string;

  ngOnInit(): void {
    console.log(this.exam);
    this.labNotes = this.exam.labNotes;
  }

  saveChanges(targetStatus: number): void {
    this.es.postLabExam(this.exam.id, this.labNotes, targetStatus);
    this.closeOverlay();
  }

  closeOverlay(): void {
    this.active = false;
    this.activeChange.emit(this.active);
  }

  labStatusToText(status: number): string {
    const statuses = ['New', 'In Progress', 'Awaiting Confirmation', 'Cancelled', 'Finished'];
    return statuses[status];
  }

  prettyDateFromDate(time: Date): string {
    if(typeof(time) === 'string'){
      time = new Date(time);
    }

    return time.toLocaleDateString(navigator.language, {
      year: 'numeric',
      month:'2-digit',
      day: '2-digit',
    });
  }

  prettyTimeFromDate(time: Date): string {
    if(typeof(time) === 'string'){
      time = new Date(time);
    }

    return time.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    });
  }

}
