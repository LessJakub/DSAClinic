using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class LabSupervisor : IPerson
    {
        [ForeignKey("AppUser")]
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Surname { get; set; }

        public virtual ICollection<LabExaminations> LabExaminations { get; set; }

        public virtual AppUser AppUser { get; set; }
    }
}