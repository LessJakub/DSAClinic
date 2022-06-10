using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class GeneralLabTestDTO
    {
        public GeneralLabTestDTO()
        {
        }

        public GeneralLabTestDTO(Entities.LabExaminations labTest)
        {
            this.Id = labTest.Id;
            this.Status = labTest.Status;
            this.OrderDate = labTest.OrderDate;
            this.ExaminationListId = labTest.ExaminationListId;
        }
        public int Id { get; set; }
        public LabStatus Status { get; set; }
        public DateTime OrderDate { get; set; }
        public int ExaminationListId { get; set; }

    }
}