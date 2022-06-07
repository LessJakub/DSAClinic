export interface VisitDetail {
    id: number,
    description?: string,
    diagnosis?: string,
    registrationTime: Date,
    finalizationTime?: Date,
    visitTime: Date,
    status: string,
    doctorId: number,
    patientId: number,
    registrantId: number
}
