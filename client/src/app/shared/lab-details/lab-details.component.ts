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

}
