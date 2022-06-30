import { Status } from "./status";

export interface VisitGeneral {
    id: number,
    doctorName: string,
    patientName: string,
    date: Date,
    status: Status,
    diagnosis?: string
}
