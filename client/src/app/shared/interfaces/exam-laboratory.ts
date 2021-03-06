import { ExamType } from "./exam-type";

export interface ExamLaboratory {
    id: number,
    status: number,
    labTestStatus?: number,
    orderDate: Date,
    executionDate?: Date,
    doctorNotes?: string,
    labNotes?: string,
    cancelationReason: string,
    examinationListId: number,
    visitsId: number,
    labSupervisorId?: number,
    labTechnicianId?: number,
    labSupervisorName: string,
    labTechnicianName: string,
    examination: ExamType
}