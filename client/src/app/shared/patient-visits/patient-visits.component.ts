import { Component, Input, OnInit } from '@angular/core';

import { VisitGeneral } from '../interfaces/visit-general';
import { VisitsService } from 'src/app/services/visits.service';
import { VisitDetail } from '../interfaces/visit-detail';
import { Status } from '../interfaces/status';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css'],
  host: {'class' : 'grow flex flex-col p-6'}
})
export class PatientVisitsComponent implements OnInit {

  constructor(private vs: VisitsService,
              public us: UtilityService) { }

  @Input() visits: VisitGeneral[];
  @Input() mode: string;

  overlayActive = false;
  chosenVisitDetail: VisitDetail;
  chosenVisitGeneral: VisitGeneral;

  ngOnInit(): void {
    this.visits?.sort((a, b) => b.date.valueOf() - a.date.valueOf());
   }

  openDetails(visit: VisitGeneral): void {
    this.overlayActive = true;

    this.vs.getVisit(visit.id).subscribe(result => {
      this.chosenVisitDetail = result;
      this.chosenVisitDetail.finalizationTime = this.us.localizeDate(this.chosenVisitDetail.finalizationTime);
      this.chosenVisitDetail.registrationTime = this.us.localizeDate(this.chosenVisitDetail.registrationTime);
      this.chosenVisitDetail.visitTime = this.us.localizeDate(this.chosenVisitDetail.visitTime);
    });
    this.chosenVisitGeneral = visit;
  }

  cancelVisit(visit: VisitDetail): void {
    this.vs.cancelVisit(visit);
  }

}