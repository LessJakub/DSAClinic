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
    public class LabController : BaseApiController
    {
        public DataContext context { get; }
        public LabController(DataContext context)
        {
            this.context = context;
        }
    
    /// <summary>
    ///  Reads all laboratory tests and returns general info about it.
    /// </summary>
    /// <remarks>Returns only partial information. Can by accessed by any role.</remarks>
    /// <returns>List of GeneralLabTestDTO.</returns>
    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<List<GeneralLabTestDTO>>> ReadAll(int startIndex = 0, int endIndex = 15)
    {
        var tests = new List<GeneralLabTestDTO>();
        foreach(var test in await context.LabExaminations.
            Skip(startIndex).
            Take(endIndex).
            ToListAsync()) 
                tests.Add(new GeneralLabTestDTO(test));

        return tests;
    }

        /// <summary>
        /// Returns detailed information about laboratory test with given id.
        /// </summary>
        /// <param name="id">Id of the lab testr</param>
        /// <remarks>Can be accessed by LabTechnician or LabSupervisor</remarks>
        /// <returns>Detailed information about lab test.</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles="LabTechnician,LabSupervisor")]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<LabTestDTO>> Read(int id)
        {
            var test = await context.LabExaminations.FirstOrDefaultAsync(v => v.Id == id);
            if(test is null) return BadRequest($"There is no laboratory test with id {id}");

            return new LabTestDTO(test);
        }

        /// <summary>
        /// Returns detailed information of Lab Examinations with LabStatus == status
        /// </summary>
        /// <remarks>Sorted by ascending order date (from oldest to newest)
        ///public enum LabStatus
        ///{
        ///     NEW_TEST,
        ///     IN_PROGRESS,
        ///     AWAITING_FOR_CONFIRMATION,
        ///     CANCELLED,
        ///     FINISHED
        ///}
        ///Can be accessed by LabTechnician or LabSupervisor.
        ///</remarks>
        /// <param name="status">Status of lab test, check remarks for details</param>
        /// <param name="startIndex">Number of entries from the start that should be omited</param>
        /// <param name="endIndex">How many entries should be returned</param>
        /// <returns>Sorted list of LabTestDTO</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles="LabTechnician,LabSupervisor")]
        [HttpGet("status")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<LabTestDTO>>> ReadWithStatusSorted(LabStatus status, int startIndex = 0, int endIndex = 20)
        {
            
            var examinations = await context.LabExaminations.
                            Where(e => e.Status == status).
                            OrderBy(e => e.OrderDate).
                            Skip(startIndex).
                            Take(endIndex).
                            ToListAsync();

            var listToRet = new List<LabTestDTO>();
            foreach(var e in examinations)
            {
                listToRet.Add(new LabTestDTO(e));
            }
            return listToRet;
        }

        /// <summary>
        /// Returns detailed information of Lab Examinations with id
        /// </summary>
        /// <remarks> Not sorted. Can be accessed by LabTechnician or LabSupervisor.
        ///</remarks>
        /// <returns>ExaminationDTO of requested examination</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles="LabTechnician,LabSupervisor")]
        [HttpGet("examination-list")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ExaminationDTO>> ReadExaminationList(int id)
        {
            
            var examinationList = await context.ExaminationLists.FirstOrDefaultAsync(e => e.Id == id);
            if(examinationList is null) return NoContent();

            return new ExaminationDTO(examinationList);
        }

        /// <summary>
        /// Get list of examination types bassed on either physical or lab type.
        /// </summary>
        /// <remarks> Can be accessed by LabTechnician, LabSupervisor or Doctor
        /// </remarks>
        /// <param name="examinationType">Type of examination
        ///public enum ExaminationType{
        /// PHYSICAL,
        /// LABORATORY
        ///}
        /// </param>
        /// <returns>List of examinations with requested type</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles="LabTechnician,LabSupervisor,Doctor")]
        [HttpGet("examination-types")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ExaminationDTO>>> GetExaminationTypes(ExaminationType examinationType)
        {
            
            var examinationTypes = await context.ExaminationLists.Where(e => e.Type == examinationType).ToListAsync();
            if(examinationTypes is null) return NoContent();

            var listToRet = new List<ExaminationDTO>();
            foreach(var t in examinationTypes) listToRet.Add(new ExaminationDTO(t));

            return listToRet;
        }

        /// <summary>
        /// Search examination types
        /// </summary>
        /// <remarks> Can be accessed by LabTechnician, LabSupervisor or Doctor
        /// </remarks>
        /// <param name="type">Type of examination, can be null
        ///public enum ExaminationType{
        /// PHYSICAL,
        /// LABORATORY
        ///}
        /// </param>
        /// <param name="name">Name of the examination, can be null</param>
        /// <param name="icd">Icd of the examination, can be null</param>
        /// <returns>List of examinations matching the filters</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles="LabTechnician,LabSupervisor,Doctor")]
        [HttpGet("examination-types/q")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ExaminationDTO>>> SearchExaminationTypes([FromQuery] string? name,[FromQuery] string? icd, [FromQuery] ExaminationType? type )
        {
            var tmp = new List<ExaminationList>();

            if(name is not null) tmp = await context.ExaminationLists.Where(e => e.Name == name).ToListAsync();
            else if(icd is not null) tmp = await context.ExaminationLists.Where(e => e.Icd == icd).ToListAsync();
            else if(type is not null) tmp = await context.ExaminationLists.Where(e => e.Type == type).ToListAsync();
            
            if(icd is not null) tmp = tmp.Where(e => e.Icd == icd).ToList();
            if(type is not null) tmp = tmp.Where(e => e.Type == type).ToList();


            var listToRet = new List<ExaminationDTO>();
            foreach(var t in tmp) listToRet.Add(new ExaminationDTO(t));

            return listToRet;
        }

        /// <summary>
        /// Updates laboratory test with new given values.
        /// </summary>
        /// <param name="id">Id of the lab test</param>
        /// <param name="testDTO">New lab test parameters</param>
        /// <remarks>Values can be null. If new status is CANCELLED, cancelation reason must be provided. Can be accessed only by LabTechnician or LabSupervisor </remarks>
        /// <returns>Lab test with updated values</returns>
        [Authorize(Roles="LabTechnician,LabSupervisor")]
        [HttpPut("{id}")]
        public async Task<ActionResult<LabTestDTO>> Update(int id, UpdateLabTestDTO testDTO)
        {
            var test = await context.LabExaminations.FirstOrDefaultAsync(v => v.Id == id);
            var requesterID=GetRequesterId();
            var requesterUser= await context.Users.FindAsync(requesterID);


            if(test is null) return BadRequest($"There is no test with id {id}");
            if(requesterUser.LabTechnician==null && requesterUser.LabSupervisor==null) return BadRequest($"Only laboratory employees can update laboratory test");

            if(requesterUser.LabTechnician is not null){

                test.LabTechnician=requesterUser.LabTechnician;
                test.LabTechnicianId=requesterUser.LabTechnician.Id;
            }
            if(requesterUser.LabSupervisor is not null){
                test.LabSupervisor=requesterUser.LabSupervisor;
                test.LabSupervisorId=requesterUser.LabSupervisor.Id;
            }

            if(testDTO.Status == LabStatus.CANCELLED && testDTO.CancelationReason is null) return BadRequest("You must provide cancelation reason");
            else if(testDTO.Status == LabStatus.CANCELLED) test.CancelationReason = testDTO.CancelationReason;

            test.Status=testDTO.Status;
            if(testDTO.LabTestStatus is not null) test.LabTestStatus=testDTO.LabTestStatus;
            if(testDTO.LabNotes is not null) test.LabNotes=testDTO.LabNotes;
            if(testDTO.Status==LabStatus.FINISHED || testDTO.Status==LabStatus.CANCELLED) test.ExecutionDate=DateTime.Now;


            await context.SaveChangesAsync();
            return new LabTestDTO(test);
        }

        /// <summary>
        /// Searches for lab examinations with specified filters.
        /// </summary>
        /// <param name="patientId">Id of the patient</param>
        /// <param name="doctorId">Id of the doctor</param>
        /// <param name="visitId">Id of the visit</param>
        /// <remarks>Values can be null.Can be accessed by any role</remarks>
        /// <returns>List of GeneralLabTestDTO</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpGet("q")]
        public async Task<ActionResult<List<GeneralLabTestDTO>>> Search([FromQuery]int patientId, [FromQuery]int doctorId, [FromQuery]int visitId)
        {
            //Check arguments and create first list
            List<LabExamination> tmp = new List<LabExamination>();
            if (patientId != default) tmp = await context.LabExaminations.Where(e => e.Visits.PatientId == patientId).ToListAsync();
            else if(doctorId != default) tmp = await context.LabExaminations.Where(e => e.Visits.DoctorId == doctorId).ToListAsync();
            else if(visitId != default) tmp = await context.LabExaminations.Where(e => e.VisitsId == visitId).ToListAsync();

            //Filter out unnecesary elements.
            if (patientId != default) tmp = tmp.Where(e => e.Visits.PatientId == patientId).ToList();
            if(doctorId != default) tmp = tmp.Where(e => e.Visits.DoctorId == doctorId).ToList();
            if(visitId != default) tmp = tmp.Where(e => e.VisitsId == visitId).ToList();

            //Convert list of detailed info into general information.
            var listToRet = new List<GeneralLabTestDTO>();
            foreach(var e in tmp) listToRet.Add(new GeneralLabTestDTO(e));

            return listToRet;
        }

    /// <summary>
    /// Deletes test with given id.
    /// </summary>
    /// <param name="id">Id of the lab test to be deleted</param>
    /// <remarks>Can be accessed only by LabSupervisor</remarks>
    /// <returns>Status code</returns>
    [Authorize(Roles = "LabSupervisor")]
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Delete(int id)
    {
        var test = await context.LabExaminations.FirstOrDefaultAsync(v => v.Id == id);
        if(test is null) return BadRequest($"There is no laboratory test with id {id}");

        context.Remove(test);

        await context.SaveChangesAsync();

        return Ok();
    }
    }
}
