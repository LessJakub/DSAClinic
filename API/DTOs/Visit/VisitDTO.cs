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
        }

        public int Id { get; set; }

        public string Description { get; set; }
        
        public string Diagnosis { get; set; }

        public DateTime RegistrationTime { get; set; }

        public DateTime FinalizationTime { get; set; }

        public TimeSpan VisitTime { get; set; }

        public string Status { get; set; }

        public int DoctorId { get; set; }

        public int PatientId { get; set; }

        public int RegistrantId { get; set; }

    }
}