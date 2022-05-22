using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class NewLabTestDTO
    {
        public string Status { get; set; }

        public DateTime OrderDate { get; set; }

        public string DoctorNotes { get; set; }

        public int ExaminationListId { get; set; }

        public int VisitsId { get; set; }
    }
}