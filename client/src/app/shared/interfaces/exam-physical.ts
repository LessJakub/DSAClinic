import { ExamType } from "./exam-type";

export interface ExamPhysical {
    "id": number,
    "results": string,
    "visitId": number,
    "examinationListId": number,
    "examinationListDTO": ExamType
}
