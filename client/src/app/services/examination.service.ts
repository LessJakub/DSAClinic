import { Injectable } from '@angular/core';

import { ExamLaboratory } from '../shared/interfaces/exam-laboratory';
import { ExamPhysical } from '../shared/interfaces/exam-physical';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  examsPhys : ExamPhysical[];
  examsLab  : ExamLaboratory[];

  constructor() {
    this.examsPhys = [
      {type: "BP", name: "Blood Pressure", result: "High"},
      {type: "BP", name: "Blood Pressure", result: "High"},
      {type: "BP", name: "Blood Pressure", result: "High"}
    ]

    this.examsLab = [
      {type: "LT01", name: "LabTest01", status: "Pending", doctorsNotes: "Priority test", labNotes: "Awaiting test material"},
      {type: "LT02", name: "LabTest02", status: "Pending", doctorsNotes: "Priority test", labNotes: "Awaiting test material"},
      {type: "LT03", name: "LabTest03", status: "Pending", doctorsNotes: "Priority test", labNotes: "Awaiting test material"},
    ]
   }

  getVisitPhysicals(visitId: number) : ExamPhysical[] {
    return this.examsPhys;
  }

  getVisitLaboratory(visitId: number) : ExamLaboratory[] {
    return this.examsLab;
  }

  addVisitPhysical(visitId: number, exam: ExamPhysical) : ExamPhysical[] {
    this.examsPhys.push(exam);
    return this.examsPhys;
  }

  addVisitLaboratory(visitId: number, exam: ExamLaboratory) : ExamLaboratory[] {
    this.examsLab.push(exam);
    return this.examsLab;
  }
}
