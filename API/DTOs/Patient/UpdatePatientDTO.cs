using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdatePatientDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Pesel { get; set; }
    }
}