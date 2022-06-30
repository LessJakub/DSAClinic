using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public interface IPerson
    {
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}