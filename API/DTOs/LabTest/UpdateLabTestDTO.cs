using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class UpdateLabTestDTO
    {
        public LabStatus Status { get; set; }
        public string? LabTestStatus { get; set; }
        public string? LabNotes { get; set; }    
        public int? LabSupervisorId { get; set; }
        public int? LabTechnicianId { get; set; }
    }
}