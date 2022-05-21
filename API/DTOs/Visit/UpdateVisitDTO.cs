using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateVisitDTO
    {
        public string Description { get; set; }
        public string Diagnosis { get; set; }
        public DateTime FinalizationTime { get; set; }
        public DateTime VisitTime { get; set; }
        public string Status { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
    }
}