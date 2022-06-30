import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExaminationService } from 'src/app/services/examination.service';
import { ExamPhysical } from 'src/app/shared/interfaces/exam-physical';

@Component({
  selector: 'app-phys-create',
  templateUrl: './phys-create.component.html',
  styleUrls: ['./phys-create.component.css']
})
export class PhysCreateComponent implements OnInit {

  constructor(private es: ExaminationService) { }

  @Input()  active!: boolean;
  @Output() activeChange = new EventEmitter<boolean>();
  @Output() stateChanged = new EventEmitter<boolean>();

  @Input() visitID!: number;

  form = new FormGroup({
    type: new FormControl(0, Validators.required),
    desc: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
  }

  sendExamination(): void {
    if(this.form.valid) {
      this.es.addVisitPhysical(this.visitID, this.form.controls['desc'].value, this.form.controls['type'].value).subscribe(result => {
        if(result) {
          this.stateChanged.emit(true);
          this.closeOverlay();
        }
      });
    }
  }

  closeOverlay(): void {
    this.active = false;
    this.activeChange.emit(this.active);
  }

}
