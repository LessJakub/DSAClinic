import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ExaminationService } from 'src/app/services/examination.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ExamLaboratory } from 'src/app/shared/interfaces/exam-laboratory';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css'],
  host: {'class': 'grow flex flex-col'}, // ! Styling host container to fill all avialable space
})
export class TechnicianComponent implements OnInit {

  constructor(private es: ExaminationService,
              public us: UtilityService) { }

  examinations: ExamLaboratory[];
  overlayActive = false;
  selectedExamination: ExamLaboratory;

  form = new FormGroup({
    filter: new FormControl(0, Validators.required),
  })

  ngOnInit(): void {
    this.form.controls['filter'].setValue(0, {onlySelf: true});
    this.form.controls['filter'].updateValueAndValidity();
  }

  getList(): void{
    if(this.form.valid){
      this.es.getLabExams(this.form.get("filter")?.value).subscribe(list => {
        this.examinations = list.reverse();
      });
      
      console.log(`Getting elements for date ${this.form.get("date")?.value} and filter ${this.form.get("filter")?.value}`);
    }
  }

  selectExamination(exam: ExamLaboratory) {
    this.selectedExamination = exam;
    this.overlayActive = true;
  }

}
