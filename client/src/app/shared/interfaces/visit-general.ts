import { PatientData } from "./patient-data";

export interface VisitGeneral {
    description: string,
    diagnosis?: string,
    doctorId: number,
    finalizationTime?: Date,
    id: number,
    patientId: number,
    registrantId: number,
    registrationTime: Date,
    status: string,
    visitTime: Date
}
