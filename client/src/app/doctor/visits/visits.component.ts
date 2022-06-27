import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { AccountService } from 'src/app/services/account.service';

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
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.as.currentUser$.subscribe(user => this.doctorID = Number(jwt_decode<customJwtPayload>(user?.token).UserId))
  }

  getList(): void{
    if(this.form.valid){
      this.vs.getDoctorVisitsList(this.doctorID, new Date(this.form.get("date")?.value), this.form.get("filter")?.value).subscribe(list => {
        this.list = list;
        this.list.forEach((visit, index, arr) => 
        {
          arr[index].date = this.localizeDate(visit.date);
        })
      },
      error => console.error(error));
      
      console.log(`Getting elements for date ${this.form.get("date")?.value} and filter ${this.form.get("filter")?.value}`);
    }
  }

  selectVisit(visit: VisitGeneral) {
    this.router.navigate([`visit/${visit.id}`], {relativeTo: this.route.parent});
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
    if(typeof(time) === 'string'){
      time = new Date(time);
    }

    return time.toLocaleDateString(navigator.language, {
      year: 'numeric',
      month:'2-digit',
      day: '2-digit',
    });
  }

  prettyTimeFromDate(time: Date): string {
    if(typeof(time) === 'string'){
      time = new Date(time);
    }

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
