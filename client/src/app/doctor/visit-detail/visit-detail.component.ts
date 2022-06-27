import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VisitsService } from 'src/app/services/visits.service';
import { VisitDetail } from 'src/app/shared/interfaces/visit-detail';
import { ExamPhysical } from 'src/app/shared/interfaces/exam-physical';
import { ExamLaboratory } from 'src/app/shared/interfaces/exam-laboratory';
import { ExaminationService } from 'src/app/services/examination.service';
import { PatientData } from 'src/app/shared/interfaces/patient-data';
import { PatientsService } from 'src/app/services/patients.service';
import { VisitGeneral } from 'src/app/shared/interfaces/visit-general';

@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.component.html',
  styleUrls: ['./visit-detail.component.css'],
  host: {'class': 'grow flex flex-col'}, // ! Styling host container to fill all avialable space
})
export class VisitDetailComponent implements OnInit {

  visit: VisitDetail;
  patient: PatientData;
  patientVisits: VisitGeneral[];
  selectedTab: string = 'phys';

  physicalExams: ExamPhysical[];
  laboratoryExams: ExamLaboratory[];

  labOverlayActive: boolean;
  selectedLabExamination: ExamLaboratory;
  physOverlayActive: boolean;
  selectedPhysExamination: ExamPhysical;
  addLabOverlayActive: boolean;
  addPhysOverlayActive: boolean;

  constructor(private vs: VisitsService,
              private es: ExaminationService,
              private ps: PatientsService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    // Get the details of the selected visit
    let visitId = Number(this.route.snapshot.paramMap.get('id'));
    this.vs.getVisit(visitId).subscribe((visit) =>{
      this.visit = visit;
      this.visit.finalizationTime = this.localizeDate(this.visit.finalizationTime);
      this.visit.registrationTime = this.localizeDate(this.visit.registrationTime);
      this.visit.visitTime = this.localizeDate(this.visit.visitTime);
      // Get the details of the patient whose visit this is
      this.ps.getPatientDetails(visit?.patientId).subscribe(patient => this.patient = patient);
      // Get this patients visit list
      this.vs.getPatientVisitsList(visit?.patientId).subscribe(visits => {
        this.patientVisits = visits;
        this.patientVisits.forEach((visit, index, arr) => {
          arr[index].date = this.localizeDate(visit.date);
        })
      });

      // Get visits examinations
      this.es.getVisitPhysicals(this.visit.id).subscribe(physicals => {
        this.physicalExams = physicals;
      });

      this.es.getVisitLaboratory(this.visit.id).subscribe(lab => {
        this.laboratoryExams = lab;
        this.laboratoryExams.forEach((exam, index, arr) => {
          arr[index].executionDate = arr[index].executionDate? this.localizeDate(exam.executionDate) : null;
          arr[index].orderDate = this.localizeDate(exam.orderDate);
        })
      });
    });
  }

  openPhysDetails(exam: ExamPhysical): void {
    this.selectedPhysExamination = exam;
    this.physOverlayActive = true;
  }

  addPhysOverlay(): void {
    this.addPhysOverlayActive = true;
  }
  
  openLabDetails(exam: ExamLaboratory) : void {
    this.selectedLabExamination = exam;
    this.labOverlayActive = true;
  }
  
  addLabOverlay(): void {
    this.addLabOverlayActive = true;
  }

  goBack(): void {
    this.location.back();
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  cancelVisit(): void {
    this.vs.cancelVisit(this.visit);
    this.goBack();
  }

  finalizeVisit(): void {
    this.vs.finishVisit(this.visit);
    this.goBack();
  }

  localizeDate(date: Date): Date {
    if (date == null) {
      return null;
    }
    let local = new Date(date);
    local.setHours(local.getHours() + local.getTimezoneOffset() / -60);

    //console.log(`Before: ${date} after: ${local}`);

    return local;
  }

}
