using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class LabTechnician : IPerson
    {
        [ForeignKey("AppUser")]
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Surname { get; set; }

        public virtual ICollection<LabExamination> LabExaminations { get; set; }

        public virtual AppUser AppUser { get; set; }
    }
}