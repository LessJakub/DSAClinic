import { ExamType } from "./exam-type";

export interface ExamLaboratory {
    id: number,
    status: number,
    labTestStatus?: number,
    orderDate: Date,
    executionDate?: Date,
    doctorNotes?: string,
    labNotes?: string,
    examinationListId: number,
    visitsId: number,
    labSupervisorId?: number,
    labTechnicianId?: number,
    labSupervisorName: string,
    labTechnicianName: string,
    examination: ExamType
}

//status            V
//orderDate         V
//execDate          V
//doctorName        X
//doctorNotes FULL  V
//labNotes EDITABLE V
//labSup name       X
//lab Tech name     X