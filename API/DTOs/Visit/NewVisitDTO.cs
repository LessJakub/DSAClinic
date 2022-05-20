using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class NewVisitDTO
    {
        public string Description { get; set; }
        
        public string VisitTime { get; set; }
        public string Status { get; set; }

        public int DoctorId { get; set; }
        public int PatientId { get; set; }
    }
}