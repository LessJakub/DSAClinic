using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{  
    [Table("ExaminationLists")]
    public class ExaminationList
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Icd { get; set; }

        public int Type { get; set; }

        public virtual ICollection<LabExaminations>LabExaminations { get; set; }

        public virtual ICollection<PhysicalExamination>PhysicalExaminations { get; set; }
    }
}