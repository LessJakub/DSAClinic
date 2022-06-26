import { Component, Input, OnInit } from '@angular/core';

import { VisitGeneral } from '../interfaces/visit-general';
import { VisitsService } from 'src/app/services/visits.service';
import { VisitDetail } from '../interfaces/visit-detail';
import { Status } from '../interfaces/status';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css'],
  host: {'class' : 'grow flex flex-col p-6'}
})
export class PatientVisitsComponent implements OnInit {

  constructor(private vs: VisitsService) { }

  @Input() visits: VisitGeneral[];
  @Input() mode: string;

  overlayActive = false;
  chosenVisitDetail: VisitDetail;
  chosenVisitGeneral: VisitGeneral;

  ngOnInit(): void { }

  openDetails(visit: VisitGeneral): void {
    this.overlayActive = true;

    this.vs.getVisit(visit.id).subscribe(result => {
      this.chosenVisitDetail = result;
      this.chosenVisitDetail.finalizationTime = this.localizeDate(this.chosenVisitDetail.finalizationTime);
      this.chosenVisitDetail.registrationTime = this.localizeDate(this.chosenVisitDetail.registrationTime);
      this.chosenVisitDetail.visitTime = this.localizeDate(this.chosenVisitDetail.visitTime);
    });
    this.chosenVisitGeneral = visit;
  }

  cancelVisit(visit: VisitDetail): void {
    this.vs.cancelVisit(visit);
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
    return time.toLocaleDateString(navigator.language, {
      year: 'numeric',
      month:'2-digit',
      day: '2-digit',
    });
  }

  prettyTimeFromDate(time: Date): string {
    return time.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    });
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