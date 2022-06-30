using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.Examination
{
    public class NewExaminationDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public ExaminationType Type { get; set; }

        [Required]
        public string Icd { get; set; }
    }
}