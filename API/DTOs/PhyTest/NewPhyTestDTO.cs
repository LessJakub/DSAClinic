using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class NewPhyTestDTO
    {
        public string Results { get; set; }

        public int VisitsId { get; set; }

        public int ExaminationListId { get; set; }
    }
}