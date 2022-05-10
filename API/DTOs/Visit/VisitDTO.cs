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
            this.RegistrationDay = visit.RegistrationDay;
            this.Time = visit.Time;
            this.Status = visit.Status;
            this.DoctorId = visit.DoctorId;
            this.PatientId = visit.PatientId;
            this.RegistrantId = visit.RegistrantId;
        }

        public int Id { get; set; }

        public string Description { get; set; }
        
        public string Diagnosis { get; set; }

        public DateTime RegistrationDay { get; set; }

        public DateTime FinalizationDay { get; set; }

        public TimeSpan Time { get; set; }

        public string Status { get; set; }

        //public virtual Doctor Doctor { get; set; }

        public int DoctorId { get; set; }

        //public virtual Patient Patient { get; set; }

        public int PatientId { get; set; }

        //public virtual Registrant Registrant { get; set; }

        public int RegistrantId { get; set; }

        //public virtual ICollection<LabExamination> LabExaminations { get; set; }

        //public virtual ICollection<PhysicalExamination>PhysicalExaminations { get; set; }
    }
}