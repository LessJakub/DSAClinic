import { ExamLaboratory } from "./exam-laboratory";
import { ExamPhysical } from "./exam-physical";
import { VisitGeneral } from "./visit-general";

export interface VisitDetail {
    general: VisitGeneral,
    description?: string,
    physysicals?: ExamPhysical[]
    laboboratory?: ExamLaboratory[]
}
