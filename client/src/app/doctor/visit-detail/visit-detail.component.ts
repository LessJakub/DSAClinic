import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VisitsService } from 'src/app/services/visits.service';
import { VisitDetail } from 'src/app/shared/interfaces/visit-detail';
import { ExamPhysical } from 'src/app/shared/interfaces/exam-physical';
import { ExamLaboratory } from 'src/app/shared/interfaces/exam-laboratory';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.component.html',
  styleUrls: ['./visit-detail.component.css'],
  host: {'class': 'grow flex flex-col'}, // ! Styling host container to fill all avialable space
})
export class VisitDetailComponent implements OnInit {

  visit: VisitDetail;
  selectedTab: string = 'phys';

  physicalExams: ExamPhysical[];
  laboratoryExams: ExamLaboratory[];

  constructor(private vs: VisitsService,
              private es: ExaminationService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.visit = this.vs.getVisit(Number(this.route.snapshot.paramMap.get('id')));

    this.physicalExams = this.es.getVisitPhysicals(this.visit.general.id);
    this.laboratoryExams = this.es.getVisitLaboratory(this.visit.general.id);
  }

  goBack(): void {
    this.location.back();
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

}
