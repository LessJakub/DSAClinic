import { Status } from "./status";

export interface VisitDetail {
    id: number,
    description?: string,
    diagnosis?: string,
    registrationTime: Date,
    finalizationTime?: Date,
    visitTime: Date,
    status: Status,
    doctorId: number,
    patientId: number,
    registrantId: number
}
