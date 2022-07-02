import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ExamLaboratory } from 'src/app/shared/interfaces/exam-laboratory';

@Component({
  selector: 'app-lab-tech-details',
  templateUrl: './lab-tech-details.component.html',
  styleUrls: ['./lab-tech-details.component.css'],
  host: {'class': 'absolute top-0 left-0 w-full h-full z-50'}, // ! Styling host container to fill all avialable space
})
export class LabTechDetailsComponent implements OnInit {

  constructor(private es: ExaminationService,
              public us: UtilityService) { }

  @Input()  active!: boolean;
  @Output() activeChange = new EventEmitter<boolean>();
  @Output() statusChange = new EventEmitter<boolean>();

  @Input() exam!: ExamLaboratory;
  @Input() editable!: boolean;

  labNotes: string;
  cancellationNotes: string = null;

  ngOnInit(): void {
    //console.log(this.exam);
    if(this.exam.status == 3) {
      this.labNotes = this.exam.cancelationReason;
    }
    else {
      this.labNotes = this.exam.labNotes;
    }
  }

  saveChanges(targetStatus: number): void {
    if(this.labNotes != null && this.labNotes.length > 0){
      
      //if cancelling only cancellationNotes are needed
      if(targetStatus == 3) {
        this.es.postLabExam(this.exam.id, null, this.labNotes, targetStatus).subscribe(result => {
          if(result) {
            this.statusChange.emit(true);
            this.closeOverlay();
          }
        });
      }
      // otherwise only labNotes/ result
      else {
        this.es.postLabExam(this.exam.id, this.labNotes, null, targetStatus).subscribe(result => {
          if(result) {
            this.statusChange.emit(true);
            this.closeOverlay();
          }
        });
      }
    }
  }

  closeOverlay(): void {
  this.active = false;
  this.activeChange.emit(this.active);
  }

}
