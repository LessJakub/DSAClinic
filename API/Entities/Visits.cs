using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public enum Status
    {
        NEW,
        IN_PROGRESS,
        CANCELLED,
        FINISHED
    }

    [Table("Visits")]
    public class Visits
    {
        public int Id { get; set; }

        public string Description { get; set; }
        
        public string Diagnosis { get; set; }

        public DateTime RegistrationTime { get; set; }

        public DateTime? FinalizationTime { get; set; }

        public DateTime VisitTime { get; set; }

        public Status Status { get; set; }

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