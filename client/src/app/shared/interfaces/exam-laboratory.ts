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
    labTechnicianId?: number
}
