using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
namespace API.DTOs
{
    public class UpdateExaminationDTO
    {
        public UpdateExaminationDTO()
        {
        }
        public UpdateExaminationDTO(ExaminationList examination)
        {
            this.Name = examination.Name;
            this.Type = examination.Type;
            this.Icd= examination.Icd;
        }
        public string? Name { get; set; }
        public string? Icd { get; set; }
        public ExaminationType? Type { get; set; }
    }
}