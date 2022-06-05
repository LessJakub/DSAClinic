using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class PhyTestDTO
    {
        public PhyTestDTO()
        {
        }

        public PhyTestDTO(Entities.PhysicalExamination phyTest)
        {
            this.Id = phyTest.Id;
            this.Results = phyTest.Results;
            this.VisitsId = phyTest.VisitsId;
            this.ExaminationListId = phyTest.ExaminationListId;
        }

        public int Id { get; set; }

        public string Results { get; set; }

        public int VisitsId { get; set; }

        public int ExaminationListId { get; set; }
    }
}