import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PatientsService } from 'src/app/services/patients.service';
import { PatientData } from 'src/app/shared/interfaces/patient-data';

@Component({
  selector: 'app-add-patient-overlay',
  templateUrl: './add-patient-overlay.component.html',
  styleUrls: ['./add-patient-overlay.component.css']
})
export class AddPatientOverlayComponent implements OnInit {

  constructor(private ps: PatientsService) { }

  @Input()  active!: boolean;
  @Output() activeChange = new EventEmitter<boolean>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    pesel: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  closeOverlay(): void {
    this.active = false;
    this.activeChange.emit(this.active);
  }

  submitData(): void {
    const newPatient: PatientData = {
      id: null,
      name: this.form.controls['name']?.value,
      surname: this.form.controls['surname']?.value,
      pesel: this.form.controls['pesel']?.value};
    this.ps.addPatient(newPatient);
    this.closeOverlay();
  }

}
