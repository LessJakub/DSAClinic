using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("PhysicalExaminations")]
    public class PhysicalExamination
    {
        public int Id { get; set; }

        public string Results { get; set; }

        public virtual Visits Visits { get; set; }

        public int VisitsId { get; set; }

        public virtual ExaminationList ExaminationLists { get; set; }

        public int ExaminationListId { get; set; }
    }
}