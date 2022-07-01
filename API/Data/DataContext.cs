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
        public DbSet<ExaminationList> ExaminationLists { get; set; }
        public DbSet<PhysicalExamination> PhysicalExaminations { get; set; }
        public DbSet<LabExamination> LabExaminations { get; set; }
    }
}