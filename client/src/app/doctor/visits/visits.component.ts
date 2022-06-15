import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Status } from 'src/app/shared/interfaces/status';

import { VisitGeneral } from 'src/app/shared/interfaces/visit-general';
import { VisitsService } from '../../services/visits.service';

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

  constructor(private vs: VisitsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  getList(): void{
    if(this.form.valid){
      
      if(this.form.get("filter").value == -1){
        this.vs.getDoctorVisitsList(2, new Date(this.form.get("date").value)).subscribe(list => this.list = list);
      }
      else {
        this.vs.getDoctorVisitsList(2, new Date(this.form.get("date").value)).subscribe(list => 
          this.list = list.filter((elem) => {
            elem.status == this.form.get("filter").value}
          ));
      }
      
      console.log(`Getting elements for date ${this.form.get("date").value} and filter ${this.form.get("filter").value}`);
    }
  }

  selectVisit(visit: VisitGeneral) {
    this.router.navigate([`visit/${visit.id}`], {relativeTo: this.route.parent});
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

}