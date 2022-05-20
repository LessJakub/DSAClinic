using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Visits> Visits { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Whitelist> IPWhitelist {get; set;}
    }
}