using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    //Registrant
    public enum Roles
    {
        User,
        Registerer,
        Doctor,
        Admin
    }
    public class AppUser
    {
        public int Id { get; set; }

        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
        
        public Roles Role { get; set; }
    }
}