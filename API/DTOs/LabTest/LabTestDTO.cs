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

        public LabTestDTO(LabExamination labTest)
        {
            this.Id = labTest.Id;
            this.Status = labTest.Status;
            this.LabTestStatus = labTest.LabTestStatus;
            this.OrderDate = labTest.OrderDate;
            this.ExecutionDate = labTest.ExecutionDate;
            this.DoctorNotes = labTest.DoctorNotes;
            this.LabNotes = labTest.LabNotes;
            this.ExaminationListId = labTest.ExaminationListId;
            this.VisitsId = labTest.VisitsId;
            this.LabSupervisorId = labTest.LabSupervisorId;
            this.LabTechnicianId = labTest.LabTechnicianId;
            

            if(labTest.ExaminationList is not null) this.Examination = new ExaminationDTO(labTest.ExaminationList);

            if(labTest.CancelationReason is not null) this.CancelationReason = labTest.CancelationReason;
            if(labTest.LabSupervisor is not null) LabSupervisorName = $"{labTest.LabSupervisor.Name} {labTest.LabSupervisor.Surname}";
            if(labTest.LabTechnician is not null) LabTechnicianName = $"{labTest.LabTechnician.Name} {labTest.LabTechnician.Surname}";
        }

        public int Id { get; set; }

        public LabStatus Status { get; set; }

        public string LabTestStatus { get; set; }

        public DateTime? OrderDate { get; set; }

        public DateTime? ExecutionDate { get; set; }

        public string DoctorNotes { get; set; }

        public string LabNotes { get; set; }

        public string? CancelationReason { get; set; }  = null;

        public int ExaminationListId { get; set; }

        public int VisitsId { get; set; }

        public int? LabSupervisorId { get; set; }

        public int? LabTechnicianId { get; set; }

        public string? LabSupervisorName { get; set; } = null;

        public string? LabTechnicianName { get; set; } = null;

        public ExaminationDTO? Examination { get; set; } = null;
    }
}