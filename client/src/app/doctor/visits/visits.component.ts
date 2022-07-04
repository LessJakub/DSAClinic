import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { AccountService } from 'src/app/services/account.service';
import { UtilityService } from 'src/app/services/utility.service';

import { Status } from 'src/app/shared/interfaces/status';
import { VisitGeneral } from 'src/app/shared/interfaces/visit-general';
import { VisitsService } from '../../services/visits.service';

type customJwtPayload = JwtPayload & { nameid: string, UserId: number, role: string};

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css'],
  host: {'class': 'grow flex flex-col'}, // ! Styling host container to fill all avialable space
})
export class VisitsComponent implements OnInit {

  form = new FormGroup({
    filter: new FormControl(-1, Validators.required),
    date: new FormControl()
  });
  list : VisitGeneral[];
  doctorID: number;

  constructor(private vs: VisitsService,
              private as: AccountService,
              public us: UtilityService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.as.currentUser$.subscribe(user => this.doctorID = Number(jwt_decode<customJwtPayload>(user?.token).UserId))
    this.getAllVisits();
  }

  formChanged() {
    if (this.form.get("date")?.value != null) {
        console.log("With date running")
        this.getList()
    }
    else {
        console.log("Without date")
        this.getAllVisits()
    }
  }

  getList(): void{
    if(this.form.valid){
      this.vs.getDoctorVisitsList(this.doctorID, new Date(this.form.get("date")?.value), this.form.get("filter")?.value).subscribe(list => {
        this.list = list;
        this.list.forEach((visit, index, arr) => 
        {
          arr[index].date = this.us.localizeDate(visit.date);
        })
      },
      error => console.error(error));
      
      console.log(`Getting elements for date ${this.form.get("date")?.value} and filter ${this.form.get("filter")?.value}`);
    }
  }

  getAllVisits(): void{
      this.vs.getDoctorVisitsList(this.doctorID, null, this.form.get("filter")?.value).subscribe(list => {
        this.list = list;
        this.list.forEach((visit, index, arr) => 
        {
          arr[index].date = this.us.localizeDate(visit.date);
        })
      },
      error => console.error(error));
      
      console.log(`Getting all elements for filter ${this.form.get("filter")?.value}`);
  }

  selectVisit(visit: VisitGeneral) {
    this.router.navigate([`visit/${visit.id}`], {relativeTo: this.route.parent});
  }
}
