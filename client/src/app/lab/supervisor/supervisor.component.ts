import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ExaminationService } from 'src/app/services/examination.service';
import { ExamLaboratory } from 'src/app/shared/interfaces/exam-laboratory';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css'],
  host: {'class': 'grow flex flex-col'}, // ! Styling host container to fill all avialable space
})
export class SupervisorComponent implements OnInit {

  constructor(private es: ExaminationService) { }

  examinations: ExamLaboratory[];
  overlayActive = false;
  selectedExamination: ExamLaboratory;

  form = new FormGroup({
    filter: new FormControl(0, Validators.required),
  })

  ngOnInit(): void {
    this.form.controls['filter'].setValue(2, {onlySelf: true});
    this.form.controls['filter'].updateValueAndValidity();
  }

  getList(): void{
    if(this.form.valid){
      this.es.getLabExams(this.form.get("filter").value).subscribe(list => this.examinations = list);
      
      console.log(`Getting elements for date ${this.form.get("date").value} and filter ${this.form.get("filter").value}`);
    }
  }

  selectExamination(exam: ExamLaboratory) {
    this.selectedExamination = exam;
    this.overlayActive = true;
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
