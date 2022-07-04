import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { UtilityService } from 'src/app/services/utility.service';

import { ExamLaboratory } from '../interfaces/exam-laboratory';

@Component({
  selector: 'app-lab-details',
  templateUrl: './lab-details.component.html',
  styleUrls: ['./lab-details.component.css'],
  host: {'class': 'absolute top-0 left-0 w-full h-full z-50'}, // ! Styling host container to fill all avialable space
})
export class LabDetailsComponent implements OnInit {

  constructor(private es: ExaminationService,
              public us: UtilityService) { }

  @Input()  active!: boolean;
  @Output() activeChange = new EventEmitter<boolean>();
  @Output() statusChange = new EventEmitter<boolean>();

  @Input() exam!: ExamLaboratory;
  @Input() editable!: boolean;

  cancellationNotes: string;

  ngOnInit(): void {
    this.cancellationNotes = this.exam.cancelationReason;
  }

  saveChanges(targetStatus: number): void {
        if(targetStatus == 4){
          this.es.postLabExam(this.exam.id, this.exam.labNotes, this.cancellationNotes, targetStatus).subscribe(result => {
              if(result){
                this.statusChange.emit(true);
                this.closeOverlay();
              }
            });
        }
        else if(targetStatus == 3) {
          if(this.cancellationNotes != null && this.cancellationNotes.length > 0) {
            if (confirm("Please confirm this operation.")) {
              this.es.postLabExam(this.exam.id, this.exam.labNotes, this.cancellationNotes, targetStatus).subscribe(result => {
                if(result){
                  this.statusChange.emit(true);
                  this.closeOverlay();
                }
              });
            }
          }
          else {
            window.alert("Please provide reason for cancellation.");
          }
        }
  }

  closeOverlay(): void {
    this.active = false;
    this.activeChange.emit(this.active);
  }

}
