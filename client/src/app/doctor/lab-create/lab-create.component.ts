import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-lab-create',
  templateUrl: './lab-create.component.html',
  styleUrls: ['./lab-create.component.css']
})
export class LabCreateComponent implements OnInit {

  constructor(private es: ExaminationService) { }

  @Input()  active!: boolean;
  @Output() activeChange = new EventEmitter<boolean>();

  @Input() visitID!: number;

  form = new FormGroup({
    type: new FormControl(0, Validators.required),
    notes: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  sendExamination(): void {
    if(this.form.valid) {
      this.es.addVisitLaboratory(this.visitID, this.form.controls['notes'].value, this.form.controls['type'].value);
      this.closeOverlay();
    }
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
