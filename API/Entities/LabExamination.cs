using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public enum LabStatus
    {
        NEW_TEST,
        IN_PROGRESS,
        AWAITING_FOR_CONFIRMATION,
        CANCELLED,
        FINISHED
    }
    [Table("LabExaminations")]
    public class LabExamination
    {
        public int Id { get; set; }

        public LabStatus Status { get; set; }

        public string LabTestStatus { get; set; }

        public DateTime OrderDate { get; set; }

        public DateTime ExecutionDate { get; set; }

        public string DoctorNotes { get; set; }

        public string LabNotes { get; set; }    

        public virtual ExaminationList ExaminationList { get; set; }

        public int ExaminationListId { get; set; }

        public virtual Visits Visits { get; set; }

        public int VisitsId { get; set; }

        public virtual LabSupervisor? LabSupervisor { get; set; }

        public int? LabSupervisorId { get; set; }

        public virtual LabTechnician? LabTechnician { get; set; }

        public int? LabTechnicianId { get; set; }
    }
}