using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class GeneralVisitDTO
    {
        public GeneralVisitDTO()
        {
        }

        public GeneralVisitDTO(Visits visit)
        {
            this.Id = visit.Id;
            this.DoctorName = $"{visit.Doctor.Surname} {visit.Doctor.Name}";
            this.PatientName = $"{visit.Patient.Surname} {visit.Patient.Name}";
            this.Date = visit.VisitTime;
            this.Status = visit.Status;
            this.Diagnosis = visit.Diagnosis;
        }

        public int Id { get; set; }
        public string DoctorName { get; set; }
        public string PatientName { get; set; }
        public DateTime Date { get; set; }

        public string Status { get; set; }
        public string Diagnosis { get; set; }
    }
}