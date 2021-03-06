using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
namespace API.DTOs
{
    public class ExaminationDTO
    {
        public ExaminationDTO()
        {
        }
        public ExaminationDTO(ExaminationList examination)
        {
            this.Id= examination.Id;
            this.Name = examination.Name;
            this.Type = examination.Type;
            this.Icd= examination.Icd;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icd { get; set; }
        public ExaminationType Type { get; set; }
    }
}