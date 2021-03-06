using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class VisitDTO
    {
        public VisitDTO(Visits visit)
        {
            this.Id = visit.Id;
            this.Description = visit.Description;
            this.Diagnosis = visit.Diagnosis;
            this.RegistrationTime = visit.RegistrationTime;
            this.FinalizationTime = visit.FinalizationTime;
            this.VisitTime = visit.VisitTime;
            this.Status = visit.Status;
            this.DoctorId = visit.DoctorId;
            this.PatientId = visit.PatientId;
            this.RegistrantId = visit.RegistrantId;
            if(visit.Registrant is not null) this.RegistrantName = visit.Registrant.Name;
        }

        public int Id { get; set; }

        public string Description { get; set; }
        
        public string Diagnosis { get; set; }

        public DateTime RegistrationTime { get; set; }

        public DateTime? FinalizationTime { get; set; }

        public DateTime VisitTime { get; set; }

        public Status Status { get; set; }

        public int DoctorId { get; set; }

        public int PatientId { get; set; }

        public int RegistrantId { get; set; }

        public string? RegistrantName { get; set; } = null;

    }
}