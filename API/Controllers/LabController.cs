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
    /// <remarks>Returns only partial information.</remarks>
    /// <returns>List of GeneralLabTestDTO.</returns>
    /// <response code="200">  </response>
    /// <response code="400">  </response>
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
        /// <remarks></remarks>
        /// <returns></returns>
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
        /// Updates laboratory test with new given values.
        /// Lab technician can update status only to AWAITING_FOR_CONFIRMATION
        /// Lab supervisor can update status to any available values.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="testDTO"></param>
        /// <remarks>Values can be null.</remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles="LabTechnician,LabSupervisor")]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<LabTestDTO>> Update(int id, UpdateLabTestDTO testDTO)
        {
            var test = await context.LabExaminations.FirstOrDefaultAsync(v => v.Id == id);
            var requesterID=GetRequesterId();
            var requesterUser= await context.Users.FindAsync(requesterID);


            if(test is null) return BadRequest($"There is no test with id {id}");
            if(requesterUser.LabTechnician==null && requesterUser.LabSupervisor==null) return BadRequest($"Only laboratory employees can update laboratory test");

            if(testDTO.Status == LabStatus.AWAITING_FOR_CONFIRMATION && requesterUser.LabTechnician is not null){
                test.Status=testDTO.Status;
                if(testDTO.LabTestStatus is not null) test.LabTestStatus=testDTO.LabTestStatus;
                if(testDTO.LabNotes is not null) test.LabNotes=testDTO.LabNotes;
                test.LabTechnician=requesterUser.LabTechnician;
                test.LabTechnicianId=requesterUser.LabTechnician.Id;
            }else if(requesterUser.LabSupervisor is not null){
                if(test.LabSupervisorId is null) {
                    test.LabSupervisorId=requesterID;
                test.LabSupervisor=requesterUser.LabSupervisor;
                test.LabSupervisorId=requesterUser.LabSupervisor.Id;
                    }
                test.Status=testDTO.Status;
                if(testDTO.LabTestStatus is not null) test.LabTestStatus=testDTO.LabTestStatus;
                if(testDTO.LabNotes is not null) test.LabNotes=testDTO.LabNotes;
                if(testDTO.Status==LabStatus.FINISHED || testDTO.Status==LabStatus.CANCELLED) test.ExecutionDate=DateTime.Now;
            }
            await context.SaveChangesAsync();
            return new LabTestDTO(test);
        }

        /// <summary>
        /// Searches for lab examinations with specified filters.
        /// </summary>
        /// <remarks>Values can be null. Sorting not yet implemented.</remarks>
        /// <returns>List of GeneralLabTestDTO</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpGet("q")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
    /// <param name="id"></param>
    /// <remarks></remarks>
    /// <returns></returns>
    /// <response code="200">  </response>
    /// <response code="400">  </response>
    [Authorize("LabSupervisor")]
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