using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class PhysicalExaminationDTO
    {
        public PhysicalExaminationDTO(PhysicalExamination physicalExamination)
        {
            Id = physicalExamination.Id;
            Results = physicalExamination.Results;
            VisitId = physicalExamination.VisitsId;
            ExaminationListId = physicalExamination.ExaminationListId;
            if(physicalExamination.ExaminationLists is not null) ExaminationListDTO = new ExaminationDTO(physicalExamination.ExaminationLists);
        }

        public int Id { get; set; }

        public string Results { get; set; }
        public int VisitId { get; set; }
        public int ExaminationListId { get; set; }

        public ExaminationDTO? ExaminationListDTO { get; set; } = null;
    }
}