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
        /// <remarks></remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [AllowAnonymous]
        [HttpGet("{id}/visits")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<VisitDTO>>> ReadAllVisits(int id)
        {
            var doctor = await context.Users.FindAsync(id);
            if(doctor == null) return BadRequest($"Doctor with {id} does not exist");

            var visits = new List<VisitDTO>();
            foreach(var visit in doctor.Doctor.Visits.ToList()) visits.Add(new VisitDTO(visit));

            return visits;
        }


        /// <summary>
        /// Updates particular visit with given id by a doctor 
        /// </summary>
        /// <param name="id">id of the doctor</param>
        /// <param name="visit_id">id of the visit</param>
        /// <param name="visitDTO">DTO containing information about the visit</param>
        /// <remarks>Values can be null.</remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpPut("{id}/visits/{visit_id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
            if(visitDTO.VisitTime != default) visit.VisitTime = visitDTO.VisitTime;
            if(visitDTO.Status is not null) visit.Status = visitDTO.Status;
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
        /// <param name="newLabTestDto">DTO containing information of new lab test</param>
        /// <returns>LabTestDTO from created labTest</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpPost("{id}/visits/lab-tests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
        /// Returns information about a lab test with given id.
        /// </summary>
        /// <remarks></remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [AllowAnonymous]
        [HttpGet("{id}/visits/lab-tests/{test_id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<LabTestDTO>> ReadLabTest(int id, int test_id)
        {
            var doctor = await context.Users.FindAsync(id);
            if(doctor == null) return BadRequest($"Doctor with {id} does not exist");

            var labTest = await context.LabExaminations.FirstOrDefaultAsync(test => test.Id == test_id);
            if(labTest is null) return BadRequest($"There is no lab test with id {test_id}");

            return new LabTestDTO(labTest);
        }
        
        
        /// <summary>
        /// Creates new physical test and adds it to database.
        /// </summary>
        /// <param name="id">Id of the doctor</param>
        /// <param name="newPhyTestDto">DTO containing information of new physical test</param>
        /// <returns>PhyTestDTO from created phyTest</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpPost("{id}/visits/phy-tests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
        /// <remarks></remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [AllowAnonymous]
        [HttpGet("{id}/visits/phy-tests/{test_id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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