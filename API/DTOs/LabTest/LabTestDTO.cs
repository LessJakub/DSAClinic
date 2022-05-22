using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class LabTestDTO
    {
        public LabTestDTO()
        {
        }

        public LabTestDTO(Entities.LabExamination labTest)
        {
            this.Id = labTest.Id;
            this.Status = labTest.Status;
            this.LabTestStatus = labTest.LabTestStatus;
            this.OrderDate = labTest.OrderDate;
            this.ExecutionDate = labTest.ExecutionDate;
            this.DoctorNotes = labTest.DoctorNotes;
            this.LabNotes = labTest.DoctorNotes;
            this.ExaminationListId = labTest.ExaminationListId;
            this.VisitsId = labTest.VisitsId;
            this.LabSupervisorId = labTest.LabSupervisorId;
            this.LabTechnicianId = labTest.LabTechnicianId;
        }

        public int Id { get; set; }

        public string Status { get; set; }

        public string LabTestStatus { get; set; }

        public DateTime OrderDate { get; set; }

        public DateTime ExecutionDate { get; set; }

        public string DoctorNotes { get; set; }

        public string LabNotes { get; set; }    

        public int ExaminationListId { get; set; }

        public int VisitsId { get; set; }

        public int LabSupervisorId { get; set; }

        public int LabTechnicianId { get; set; }
    }
}