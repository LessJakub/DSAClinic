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

        public DateTime RegistrationTime { get; set; }
        
        public int Minutes { get; set; }
        public string Status { get; set; }

        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public int RegistererId { get; set; }
    }
}