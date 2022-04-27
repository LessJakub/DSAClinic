using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Registrants")]
    public class Registrant
    {
        [ForeignKey("AppUser")]
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Surname { get; set; }

        public virtual ICollection<Visits> Visits { get; set; }

        public virtual AppUser AppUser { get; set; }
    }
}