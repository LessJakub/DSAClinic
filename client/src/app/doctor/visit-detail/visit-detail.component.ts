import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VisitsService } from 'src/app/services/visits.service';
import { VisitDetail } from 'src/app/shared/interfaces/visit-detail';

@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.component.html',
  styleUrls: ['./visit-detail.component.css']
})
export class VisitDetailComponent implements OnInit {

  visit: VisitDetail;

  constructor(private vs: VisitsService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.visit = this.vs.getVisit(Number(this.route.snapshot.paramMap.get('id')));
  }

  goBack(): void {
    this.location.back();
  }

}
