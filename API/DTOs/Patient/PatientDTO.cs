using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class PatientDTO
    {
        public PatientDTO()
        {
        }

        public PatientDTO(Entities.Patient patient)
        {
            this.Id = patient.Id;
            this.Name = patient.Name;
            this.Surname = patient.Surname;
            this.Pesel = patient.Pesel;
        }
        public int Id { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Pesel { get; set; }
    }
}