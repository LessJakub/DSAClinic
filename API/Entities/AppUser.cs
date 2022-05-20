using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{

    public enum Roles
    {
        User,
        Registrant,
        Doctor,
        LabSupervisor,
        LabTechnician,
        Admin
    }
    public class AppUser
    {
        public int Id { get; set; }

        public string UserName { get; set; }
        
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public string Email { get; set; }

        public bool IsActive { get; set; }
        
        public Roles Role { get; set; }

        public virtual Doctor Doctor { get; set; }

        public virtual Registrant Registrant { get; set; }

        public virtual LabSupervisor LabSupervisor { get; set; }

        public virtual LabTechnician LabTechnician { get; set; }
    }
}