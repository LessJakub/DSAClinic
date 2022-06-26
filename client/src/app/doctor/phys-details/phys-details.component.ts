import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExamPhysical } from 'src/app/shared/interfaces/exam-physical';

@Component({
  selector: 'app-phys-details',
  templateUrl: './phys-details.component.html',
  styleUrls: ['./phys-details.component.css']
})
export class PhysDetailsComponent implements OnInit {

  constructor() { }

  @Input()  active!: boolean;
  @Output() activeChange = new EventEmitter<boolean>();

  @Input() exam!: ExamPhysical;

  ngOnInit(): void {
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
