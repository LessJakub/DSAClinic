import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ExamLaboratory } from '../shared/interfaces/exam-laboratory';
import { ExamPhysical } from '../shared/interfaces/exam-physical';
import { Status } from '../shared/interfaces/status';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  private baseURL: string = "http://" + location.hostname;
  private queryAllLabExamsURL: string = this.baseURL + ":8080/v1/Lab/status";

  constructor(private http: HttpClient,
              private as: AccountService) { }

  getLabExams(filter: Status): Observable<ExamLaboratory[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("status", filter);
    
    let token: string;
    this.as.currentUser$.subscribe(user => token = user.token);

    return this.http.get<ExamLaboratory[]>(this.queryAllLabExamsURL,
      { headers: new HttpHeaders({'Content-Type': 'text/plain', 'Authorization': "Bearer " + token}),
        params: queryParams
      });
  }

  // getVisitPhysicals(visitId: number) : ExamPhysical[] {
  //   return this.examsPhys;
  // }

  // getVisitLaboratory(visitId: number) : ExamLaboratory[] {
  //   return this.examsLab;
  // }

  // addVisitPhysical(visitId: number, exam: ExamPhysical) : ExamPhysical[] {
  //   this.examsPhys.push(exam);
  //   return this.examsPhys;
  // }

  // addVisitLaboratory(visitId: number, exam: ExamLaboratory) : ExamLaboratory[] {
  //   this.examsLab.push(exam);
  //   return this.examsLab;
  // }
}
