using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{  
    [Table("ExaminationLists")]
    public class ExaminationList
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ExaminationTypes ExaminationTypes { get; set; }

        public int ExaminationTypesId { get; set; }

        public virtual ICollection<LabExamination>LabExaminations { get; set; }

        public virtual ICollection<PhysicalExamination>PhysicalExaminations { get; set; }
    }
}