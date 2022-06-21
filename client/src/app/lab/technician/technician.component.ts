import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Status } from 'src/app/shared/interfaces/status';
import { ExamLaboratory } from 'src/app/shared/interfaces/exam-laboratory';
import { ExaminationService } from 'src/app/services/examination.service';
import { LabDetailsComponent } from 'src/app/shared/lab-details/lab-details.component';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css'],
  host: {'class': 'grow flex flex-col'}, // ! Styling host container to fill all avialable space
})
export class TechnicianComponent implements OnInit {

  constructor(private es: ExaminationService) { }

  examinations: ExamLaboratory[];

  form = new FormGroup({
    filter: new FormControl(-1, Validators.required)
  })

  ngOnInit(): void {

  }

  getList(): void{
    if(this.form.valid){
      if(this.form.get("filter").value == -1){
        //this.es.getLabExams() ???
      }
      else {
        this.es.getLabExams(this.form.get("filter").value).subscribe(list => this.examinations = list);
      }
      
      console.log(`Getting elements for date ${this.form.get("date").value} and filter ${this.form.get("filter").value}`);
    }
  }

  selectExamination(visit: ExamLaboratory) {
    //open popup for an examination
  }

  statusToText(status: Status): string {
    switch(status) {
      case Status.CANCELLED: return "Cancelled";
      case Status.FINISHED: return "Finished";
      case Status.IN_PROGRESS: return "In Progress";
      case Status.NEW: return "New";
    }
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
