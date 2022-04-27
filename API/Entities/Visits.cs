using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Visits")]
    public class Visits
    {
        public int Id { get; set; }

        public string Description { get; set; }
        
        public string Diagnosis { get; set; }

        public DateTime RegistrationDay { get; set; }

        public DateTime FinalizationDay { get; set; }

        public TimeSpan Time { get; set; }

        public string Status { get; set; }

        public virtual Doctor Doctor { get; set; }

        public int DoctorId { get; set; }

        public virtual Patient Patient { get; set; }

        public int PatientId { get; set; }

        public virtual Registrant Registrant { get; set; }

        public int RegistrantId { get; set; }

        public virtual ICollection<LabExamination> LabExaminations { get; set; }

        public virtual ICollection<PhysicalExamination>PhysicalExaminations { get; set; }
        
    }
}