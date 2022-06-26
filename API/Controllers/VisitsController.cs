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

    

    public class VisitsController : BaseApiController
    {
        public DataContext context { get; }
        public VisitsController(DataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Creates new visit and adds it to the database.
        /// </summary>
        /// <param name="newVisitDTO">DTO containing information of new visit</param>
        /// <remarks>DateTime should be in format "DD.MM.YYYY HH:MM"</remarks>
        /// <returns>VisitDTO from created visit</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles="Registrant")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VisitDTO>> Create(NewVisitDTO newVisitDTO)
        {
            //Check if requester is registrant, this function returns -1 if not.
            var registrantId = GetRequesterId();
            var registrantUser = await context.Users.FindAsync(registrantId);
            if(registrantUser == null) return BadRequest($"User with id {registrantId} does not exist");
            var registrant = registrantUser.Registrant;
            if(registrant == null) return BadRequest($"User with id {registrantId} is not a registrant");

            var doctorUser = await context.Users.FindAsync(newVisitDTO.DoctorId);
            if(doctorUser == null) return BadRequest($"Doctor with id {newVisitDTO.DoctorId} does not exist");
            var doctor = doctorUser.Doctor;
            if(doctor == null) return BadRequest($"User with id {registrantId} is not a doctor");


            var patient = await context.Patients.FindAsync(newVisitDTO.PatientId);
            if(patient == null) return BadRequest($"Patient with id {newVisitDTO.PatientId} does not exist");
            
            
            var visit = new Visits{
                Description = newVisitDTO.Description,
                RegistrationTime = DateTime.Now,
                VisitTime = Convert.ToDateTime(newVisitDTO.VisitTime),
                Status = newVisitDTO.Status,
                Doctor = doctor,
                DoctorId = newVisitDTO.DoctorId,
                Patient = patient,
                PatientId = newVisitDTO.PatientId,
                Registrant = registrant,
                RegistrantId = registrantId
            };

            context.Visits.Add(visit);

            await context.SaveChangesAsync();

            return new VisitDTO(visit);
        }



        /// <summary>
        ///  Reads all visits and returns general info about it.
        /// </summary>
        /// <remarks>Returns only partial information.</remarks>
        /// <returns>List of GeneralVisitDTO.</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<GeneralVisitDTO>>> ReadAll(int startIndex = 0, int endIndex = 15)
        {
            var visits = new List<GeneralVisitDTO>();
            foreach(var visit in await context.Visits.
                Skip(startIndex).
                Take(endIndex).
                ToListAsync()) 
                    visits.Add(new GeneralVisitDTO(visit));

            return visits;
        }

        /// <summary>
        /// Returns detaild information about visit with given id.
        /// </summary>
        /// <remarks></remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VisitDTO>> Read(int id)
        {
            
            var visit = await context.Visits.FirstOrDefaultAsync(v => v.Id == id);
            if(visit is null) return BadRequest($"There is no visit with id {id}");

            return new VisitDTO(visit);
        }

        /// <summary>
        /// Searches for visits with specified filters.
        /// </summary>
        /// <remarks>Values can be null. Sorting not yet implemented.</remarks>
        /// <returns>List of GeneralVisitDTOs</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpGet("q")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<GeneralVisitDTO>>> Search([FromQuery]int patientId, [FromQuery]int doctorId, [FromQuery]string dateString, [FromQuery]Status? status)
        {
            //Convert date, has to be in proper format
            //DD.MM.YYYY HH:MM
            //24.05.2022 19:00
            var date = Convert.ToDateTime(dateString);

            //Check arguments and create first list
            List<Visits> tmp = new List<Visits>();
            if (patientId != default) tmp = await context.Visits.Where(e => e.PatientId == patientId).ToListAsync();
            else if(doctorId != default) tmp = await context.Visits.Where(e => e.DoctorId == doctorId).ToListAsync();
            else if(date != default) tmp = await context.Visits.Where(e => e.VisitTime.Date == date.Date).ToListAsync();
            else if(status is not null) tmp = await context.Visits.Where(e => e.Status == status).ToListAsync();

            //Filter out unnecesary elements.
            if (patientId != default) tmp = tmp.Where(v => v.PatientId == patientId).ToList();
            if(doctorId != default) tmp = tmp.Where(v => v.DoctorId == doctorId).ToList();
            if(date != default) tmp = tmp.Where(v => v.VisitTime.Date == date.Date).ToList();
            if(status is not null) tmp = tmp.Where(e => e.Status == status).ToList();

            //Convert list of detailed info into general information.
            var listToRet = new List<GeneralVisitDTO>();
            foreach(var e in tmp) listToRet.Add(new GeneralVisitDTO(e));

            return listToRet;
        }

        /// <summary>
        /// Updates visit with new given values.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="visitDTO"></param>
        /// <remarks>Values can be null.</remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles="Registrant,Doctor")]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VisitDTO>> Update(int id, UpdateVisitDTO visitDTO)
        {
            var visit = await context.Visits.FirstOrDefaultAsync(v => v.Id == id);
            if(visit is null) return BadRequest($"There is no visit with id {id}");

            visit.FinalizationTime = DateTime.Now;
            if(visitDTO.Description is not null) visit.Description = visitDTO.Description;
            if(visitDTO.Diagnosis is not null) visit.Diagnosis = visitDTO.Diagnosis;
            if(visitDTO.VisitTime != default) visit.VisitTime = (DateTime)visitDTO.VisitTime;
            if(visitDTO.Status is not null) visit.Status = (Status)visitDTO.Status;
            if(visitDTO.DoctorId != 0)
            {
                var doctorUser = await context.Users.FindAsync(visitDTO.DoctorId);
                if(doctorUser is null) return BadRequest($"There is no doctor with id {visitDTO.DoctorId}");
                visit.Doctor = doctorUser.Doctor;
            }
            
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
        /// Deletes visit with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <remarks></remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles="Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(int id)
        {
            var visit = await context.Visits.FirstOrDefaultAsync(v => v.Id == id);
            if(visit is null) return BadRequest($"There is no visit with id {id}");

            context.Remove(visit);

            await context.SaveChangesAsync();

            return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <remarks></remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles ="Doctor")]
        [HttpGet("physical-examinations/{visitId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<PhysicalExaminationDTO>>> ReadPhyExaminationsByVisitId(int visitId)
        {
            var tmp = await context.PhysicalExaminations.Where(examintation => examintation.VisitsId == visitId).ToListAsync();
            List<PhysicalExaminationDTO> listToRet= new List<PhysicalExaminationDTO>();
            foreach(var e in tmp) listToRet.Add(new PhysicalExaminationDTO(e));

            return listToRet;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <remarks></remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles ="Doctor")]
        [HttpGet("lab-examinations/{visitId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<LabTestDTO>>> ReadLabExaminationByVisitId(int visitId)
        {
            var tmp = await context.LabExaminations.Where(examintation => examintation.VisitsId == visitId).ToListAsync();
            List<LabTestDTO> listToRet= new List<LabTestDTO>();
            foreach(var e in tmp) listToRet.Add(new LabTestDTO(e));

            return listToRet;
        }
    }
}