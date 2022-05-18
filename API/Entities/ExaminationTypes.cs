using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("ExaminationTypes")]
    public class ExaminationTypes
    {
        public int Id { get; set; }

        public string Type { get; set; }

        public virtual ICollection<ExaminationList>ExaminationLists { get; set; }
    }
}