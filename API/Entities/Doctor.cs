using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Doctors")]
    public class Doctor : IPerson
    {
        [ForeignKey("AppUser")]
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Surname { get; set; }

        public string Npwz { get; set; }

        public virtual ICollection<Visits> Visits { get; set; }

        public virtual AppUser AppUser { get; set; }
    }
}