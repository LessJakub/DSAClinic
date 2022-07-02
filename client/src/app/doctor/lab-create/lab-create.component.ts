import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExaminationService } from 'src/app/services/examination.service';
import { ExamType } from 'src/app/shared/interfaces/exam-type';

@Component({
  selector: 'app-lab-create',
  templateUrl: './lab-create.component.html',
  styleUrls: ['./lab-create.component.css']
})
export class LabCreateComponent implements OnInit {

  constructor(private es: ExaminationService) { }

  @Input()  active!: boolean;
  @Output() activeChange = new EventEmitter<boolean>();
  @Output() stateChanged = new EventEmitter<boolean>();

  @Input() visitID!: number;

  dropdownVisibility: boolean = false;
  types: ExamType[] = null;
  chosenType: ExamType = null;

  form = new FormGroup({
    type: new FormControl(null, Validators.required),
    notes: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
  }

  sendExamination(): void {
    if(this.form.valid && this.chosenType != null) {
      this.es.addVisitLaboratory(this.visitID, this.form.controls['notes'].value, this.chosenType.id).subscribe(result => {
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

  onSelect(type: ExamType): void {
    this.chosenType = type;
    this.form.controls['type'].setValue(this.chosenType.name);
    this.dropdownVisibility = false;
  }

  search(query: string | number): void {
    query = query.toString();
    this.es.labTypeSearch(query).subscribe(types => {
      this.types = types;
    });
  }

}
