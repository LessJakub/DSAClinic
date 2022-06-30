using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{  
    public enum ExaminationType{
        PHYSICAL,
        LABORATORY
    }

    [Table("ExaminationLists")]
    public class ExaminationList
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Icd { get; set; }

        public ExaminationType Type { get; set; }

        public virtual ICollection<LabExamination>LabExaminations { get; set; }

        public virtual ICollection<PhysicalExamination>PhysicalExaminations { get; set; }
    }
}