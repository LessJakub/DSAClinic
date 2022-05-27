import { PatientData } from "./patient-data";

export interface VisitGeneral {
    id: number,
    date: Date,
    doctor: string,
    patient: PatientData,
    status: string,
    diagnosis: string
}
