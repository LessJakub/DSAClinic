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

        public GeneralLabTestDTO(LabExamination labTest)
        {
            this.Id = labTest.Id;
            this.Status = labTest.Status;
            this.OrderDate = labTest.OrderDate;
            this.ExaminationName=labTest.ExaminationList.Name;
            this.ExaminationIcd=labTest.ExaminationList.Icd;

            if(labTest.LabSupervisor is not null) LabSupervisorName = $"{labTest.LabSupervisor.Name} {labTest.LabSupervisor.Surname}";
            if(labTest.LabTechnician is not null) LabTechnicianName = $"{labTest.LabTechnician.Name} {labTest.LabTechnician.Surname}";
        }
        public int Id { get; set; }
        public LabStatus Status { get; set; }
        public DateTime OrderDate { get; set; }

        public string? LabSupervisorName { get; set; } = null;

        public string? LabTechnicianName { get; set; } = null;
        public string ExaminationName { get; set; }
        public string ExaminationIcd { get; set; }

    }
}