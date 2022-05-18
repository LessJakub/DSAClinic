using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Patients")]
    public class Patient
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Surname { get; set; }

        public virtual ICollection<Visits> Visits { get; set; }
    }
}