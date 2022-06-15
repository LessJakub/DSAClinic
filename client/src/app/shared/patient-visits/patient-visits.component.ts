import { Component, Input, OnInit } from '@angular/core';

import { VisitGeneral } from '../interfaces/visit-general';
import { VisitsService } from 'src/app/services/visits.service';
import { VisitDetail } from '../interfaces/visit-detail';

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
  chosenVisit: VisitDetail;

  ngOnInit(): void { }

  openDetails(visitID: number): void {
    this.overlayActive = true;

    this.vs.getVisit(visitID).subscribe(result => this.chosenVisit = result);
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

}