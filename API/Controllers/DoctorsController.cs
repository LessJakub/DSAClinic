using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class DoctorsController: BaseApiController
    {
        public DataContext context { get; set;}
        public DoctorsController(DataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Returns all visits and their details from a doctor with given id.
        /// </summary>
        /// <param name="id">id of the doctor</param>
        /// <remarks>Can be accessed by any role</remarks>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{id}/visits")]
        public async Task<ActionResult<List<VisitDTO>>> ReadAllVisits(int id)
        {
            var doctor = await context.Users.FindAsync(id);
            if(doctor == null) return BadRequest($"Doctor with {id} does not exist");

            var visits = new List<VisitDTO>();
            foreach(var visit in doctor.Doctor.Visits.ToList()) visits.Add(new VisitDTO(visit));

            return visits;
        }

        /// <summary>
        /// Get list of general information about doctors
        /// </summary>
        /// <remarks>Can be accessed only by Registrant</remarks>
        /// <returns>GeneralDoctorDTO with ID, name and surname</returns>
        [Authorize(Roles = "Registrant")]
        [HttpGet]
        public async Task<ActionResult<List<GeneralDoctorDTO>>> GetGeneralDoctors()
        {
            var listToRet = new List<GeneralDoctorDTO>();

            foreach(var d in await context.Users.Where(u => u.Role == Roles.Doctor).Select(u => u.Doctor).ToListAsync())
            {
                listToRet.Add(new GeneralDoctorDTO(d));
            }

            return listToRet;
        }


        /// <summary>
        /// Updates particular visit with given id by a doctor 
        /// </summary>
        /// <param name="id">id of the doctor</param>
        /// <param name="visit_id">id of the visit</param>
        /// <param name="visitDTO">DTO containing information about the visit</param>
        /// <remarks>Can be accessed only by Doctor.</remarks>
        /// <returns>Selected visit with updated information</returns>
        [Authorize(Roles="Doctor")]
        [HttpPut("{id}/visits/{visit_id}")]
        public async Task<ActionResult<VisitDTO>> Update(int id, int visit_id, UpdateVisitDTO visitDTO)
        {
            //Check if requester is doctor, this function returns -1 if not.
            var requesterId = GetRequesterId();
            var requesterUser = await context.Users.FindAsync(requesterId);
            if(requesterUser == null) return BadRequest($"User with id {requesterId} does not exist");
            var doctorUser = requesterUser.Doctor;
            if(doctorUser == null) return BadRequest($"User with id {requesterId} is not a doctor");

            var doctor = await context.Users.FindAsync(id);
            if(doctor == null) return BadRequest($"Doctor with {id} does not exist");

            var visit = await context.Visits.FindAsync(visit_id);
            if(visit is null) return BadRequest($"There is no visit with id {visit_id}");

            visit.FinalizationTime = DateTime.Now;
            if(visitDTO.Description is not null) visit.Description = visitDTO.Description;
            if(visitDTO.Diagnosis is not null) visit.Diagnosis = visitDTO.Diagnosis;
            if(visitDTO.VisitTime != default) visit.VisitTime = (DateTime)visitDTO.VisitTime;
            if(visitDTO.Status is not null) visit.Status = (Status)visitDTO.Status;
            if(visitDTO.DoctorId != 0) visit.Doctor = doctor.Doctor;         
            if(visitDTO.PatientId != 0)
            {
                var patient = await context.Patients.FindAsync(visitDTO.PatientId);
                if(patient is null) return BadRequest($"There is no patient with id {visitDTO.PatientId}");
                visit.Patient = patient;
            }

            await context.SaveChangesAsync();

            return new VisitDTO(visit);
        }


        /// <summary>
        /// Creates new lab test and adds it to database.
        /// </summary>
        /// <param name="id">Id of the doctor</param>
        /// <remarks>Can be accessed only by Doctor.</remarks>
        /// <param name="newLabTestDto">DTO containing information of new lab test</param>
        /// <returns>LabTestDTO from created labTest</returns>
        [Authorize(Roles="Doctor")]
        [HttpPost("{id}/visits/lab-tests")]
        public async Task<ActionResult<LabTestDTO>> OrderLabTest(int id, NewLabTestDTO newLabTestDto)
        {
            //Check if requester is doctor, this function returns -1 if not.
            var requesterId = GetRequesterId();
            var requesterUser = await context.Users.FindAsync(requesterId);
            if(requesterUser == null) return BadRequest($"User with id {requesterId} does not exist");
            var doctorUser = requesterUser.Doctor;
            if(doctorUser == null) return BadRequest($"User with id {requesterId} is not a doctor");

            var doctor = await context.Users.FindAsync(id);
            if(doctor == null) return BadRequest($"Doctor with {id} does not exist");

            var visit = await context.Visits.FindAsync(newLabTestDto.VisitsId);
            if (visit == null) return BadRequest($"Visit with id {newLabTestDto.VisitsId} does not exist");

            var examType = await context.ExaminationLists.FindAsync(newLabTestDto.ExaminationListId);
            if (examType == null) return BadRequest($"Exam type with id {newLabTestDto.ExaminationListId} does not exist");

            var labTest = new LabExamination{
                Status = newLabTestDto.Status,
                OrderDate = DateTime.Now,
                DoctorNotes = newLabTestDto.DoctorNotes,
                VisitsId = newLabTestDto.VisitsId,
                Visits = visit,
                ExaminationListId = newLabTestDto.ExaminationListId,
                ExaminationList = examType
            };
            

            context.Add(labTest);
            await context.SaveChangesAsync();

            return new LabTestDTO(labTest);
        }

        
        /// <summary>
        /// Returns information about a lab test with test_id.
        /// </summary>
        /// <param name="id">Id of the doctor</param>
        /// <param name="test_id">Id of the labolatory test</param>
        /// <remarks>id of the doctor does not matter</remarks>
        /// <returns>Lab test information</returns>
        [Authorize]
        [HttpGet("{id}/visits/lab-tests/{test_id}")]
        public async Task<ActionResult<LabTestDTO>> ReadLabTest(int id, int test_id)
        {
            var doctor = await context.Users.FindAsync(id);
            if(doctor == null) return BadRequest($"Doctor with {id} does not exist");

            var labTest = await context.LabExaminations.FirstOrDefaultAsync(test => test.Id == test_id);
            if(labTest is null) return BadRequest($"There is no lab test with id {test_id}");

            return new LabTestDTO(labTest);
        }
        /// <summary>
        /// Cancel a lab test with given test_id.
        /// </summary>
        /// <param name="test_id">Id of the lab test</param>
        /// <remarks>Can be accessed only by doctor</remarks>
        /// <returns>Lab test information</returns>
        [Authorize(Roles = "Doctor")]
        [HttpPut("/visits/lab-tests/{test_id}/cancel")]
        public async Task<ActionResult<LabTestDTO>> CancelLabTest(int test_id)
        {
            var requesterId = GetRequesterId();
            var requesterUser = await context.Users.FindAsync(requesterId);
            if(requesterUser is null) return BadRequest($"User with id {requesterId} does not exist");
            var doctorUser = requesterUser.Doctor;
            if(doctorUser is null) return BadRequest($"User with id {requesterId} is not a doctor");

            var labTest = await context.LabExaminations.FirstOrDefaultAsync(test => test.Id == test_id);
            if(labTest is null) return BadRequest($"There is no lab test with id {test_id}");
            if(labTest.Visits.DoctorId!=requesterId) return BadRequest($"Doctor with {requesterId} is not authorized to cancel this laboratory examination");
            if(labTest.Status==LabStatus.FINISHED || labTest.Status==LabStatus.CANCELLED) return BadRequest($"You can't cancell this test because it is either finished or already cancelled");

            labTest.Status=LabStatus.CANCELLED;
            await context.SaveChangesAsync();
            return new LabTestDTO(labTest);
        }
        
        /// <summary>
        /// Creates new physical test and adds it to database.
        /// </summary>
        /// <param name="id">Id of the doctor</param>
        /// <param name="newPhyTestDto">DTO containing information of new physical test</param>
        /// <remarks>Can be accessed only by Doctor role.</remarks>
        /// <returns>PhyTestDTO from created phyTest</returns>
        [Authorize(Roles="Doctor")]
        [HttpPost("{id}/visits/phy-tests")]
        public async Task<ActionResult<PhyTestDTO>> CreatePhysicalTest(int id, NewPhyTestDTO newPhyTestDto)
        {
             //Check if requester is doctor, this function returns -1 if not.
            var requesterId = GetRequesterId();
            var requesterUser = await context.Users.FindAsync(requesterId);
            if(requesterUser == null) return BadRequest($"User with id {requesterId} does not exist");
            var doctorUser = requesterUser.Doctor;
            if(doctorUser == null) return BadRequest($"User with id {requesterId} is not a doctor");

            var doctor = await context.Users.FindAsync(id);
            if(doctor == null) return BadRequest($"Doctor with {id} does not exist");

            var visit = await context.Visits.FindAsync(newPhyTestDto.VisitsId);
            if (visit == null) return BadRequest($"Visit with id {newPhyTestDto.VisitsId} does not exist");

            var examType = await context.ExaminationLists.FindAsync(newPhyTestDto.ExaminationListId);
            if (examType == null) return BadRequest($"Exam type with id {newPhyTestDto.ExaminationListId} does not exist");

            var phyTest = new PhysicalExamination{
                Results = newPhyTestDto.Results, 
                VisitsId = newPhyTestDto.VisitsId,
                Visits = visit,
                ExaminationListId = newPhyTestDto.ExaminationListId,
                ExaminationLists = examType           
            };
            

            context.Add(phyTest);
            await context.SaveChangesAsync();

            return new PhyTestDTO(phyTest);
        }
   

        /// <summary>
        /// Returns information about a physical test with given id.
        /// </summary>
        /// <param name="id">Id of the doctor</param>
        /// <param name="test_id">Id of requested physical test</param>
        /// <remarks>Can be accessed by any role</remarks>
        /// <returns>Information about requested physicla test</returns>
        [Authorize]
        [HttpGet("{id}/visits/phy-tests/{test_id}")]
        public async Task<ActionResult<PhyTestDTO>> ReadPhysicalTest(int id, int test_id)
        {
            var doctor = await context.Users.FindAsync(id);
            if(doctor == null) return BadRequest($"Doctor with {id} does not exist");

            var phyTest = await context.PhysicalExaminations.FirstOrDefaultAsync(test => test.Id == test_id);
            if(phyTest is null) return BadRequest($"There is no physical test with id {test_id}");

            return new PhyTestDTO(phyTest);
        }
    }
}