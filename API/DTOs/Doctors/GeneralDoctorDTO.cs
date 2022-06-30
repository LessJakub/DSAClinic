using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class GeneralDoctorDTO
    {
        public GeneralDoctorDTO(Doctor doctor)
        {
            Id = doctor.Id;
            Name = doctor.Name;
            Surname = doctor.Surname;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }
    }
}