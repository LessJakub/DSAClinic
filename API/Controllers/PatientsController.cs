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
    public class PatientsController : BaseApiController
    {
        public DataContext context { get; set; }
        public PatientsController(DataContext context)
        {
            this.context = context;
        }


        /// <summary>
        /// Creates new Patient and adds it to the database.
        /// </summary>
        /// <param name="newPatientDto">New patient information</param>
        /// <remarks>Can be accessed only by Registrant.</remarks>
        /// <returns>PatientDTO with detailed information.</returns>
        [Authorize(Roles="Registrant")]
        [HttpPost]
        public async Task<ActionResult<PatientDTO>> Create(NewPatientDTO newPatientDto)
        {
            var patient = new Patient{
                Name = newPatientDto.Name,
                Surname = newPatientDto.Surname,
                Pesel = newPatientDto.Pesel
                
            };
            

            context.Patients.Add(patient);
            await context.SaveChangesAsync();

            return new PatientDTO(patient);
        }



        /// <summary>
        /// Reads all patients.
        /// </summary>
        /// <remarks>Can be accessed by any role</remarks>
        /// <returns>All patients with detailed information.</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<PatientDTO>>> ReadAll()
        {
            var patients = new List<PatientDTO>();
            foreach(var patient in await context.Patients.ToListAsync()) patients.Add(new PatientDTO(patient));

            return patients;
        }

        /// <summary>
        /// Reads patient with specified id.
        /// </summary>
        /// <remarks>Can be accessed by any role</remarks>
        /// <returns>Detailed information about given user.</returns>
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientDTO>> Read(int id)
        {
            var patient = await context.Patients.FirstOrDefaultAsync(p => p.Id == id);
            if(patient is null) return BadRequest($"There is no patient with id {id}");

            return new PatientDTO(patient);
        }

        /// <summary>
        /// Searches for patient with given name or surname
        /// </summary>
        /// <remarks>Can be accessed by any role</remarks>
        /// <returns>List of Patients</returns>
        [Authorize]
        [HttpGet("q")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<PatientDTO>>> ReadWithNameSurname([FromQuery] string name, [FromQuery]string surname)
        {
            
            List<Patient> tmp = new List<Patient>();
            if(name is not null) tmp = await context.Patients.
                                            Where(p => $"{p.Name} {p.Surname}".Contains(name.ToLower())).
                                            ToListAsync();
            else if (surname is not null) tmp = await context.Patients.
                                            Where(p => $"{p.Name} {p.Surname}".Contains(surname.ToLower())).
                                            ToListAsync();
            
            if (surname is not null) tmp = tmp.
                                            Where(p => $"{p.Name} {p.Surname}".Contains(surname.ToLower())).
                                            ToList();

            var listToRet = new List<PatientDTO>();
            foreach(var p in tmp) listToRet.Add(new PatientDTO(p));

            return listToRet;
        }

        /// <summary>
        /// Updates patient with given id.
        /// </summary>
        /// <param name="id">Id of the patient</param>
        /// <param name="patientDTO">New patient information</param>
        /// <remarks>Can be accessed only by Registrant</remarks>
        /// <returns>PatientDTO with detailed information.</returns>
        [Authorize(Roles="Registrant")]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<PatientDTO>> Update(int id, UpdatePatientDTO patientDTO)
        {
            var patient = await context.Patients.FirstOrDefaultAsync(p => p.Id == id);
            if(patientDTO.Name is not null) patient.Name = patientDTO.Name;
            if(patientDTO.Surname is not null) patient.Surname = patientDTO.Surname;

            await context.SaveChangesAsync();

            return new PatientDTO(patient);
        }

        /// <summary>
        /// Deletes patient with given id.
        /// </summary>
        /// <param name="id">Id of the patient to be deleted</param>
        /// <remarks>Can be accessed only by Admin</remarks>
        /// <returns>Task resault.</returns>
        [Authorize(Roles="Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(int id)
        {
            var patient = await context.Patients.FirstOrDefaultAsync(p => p.Id == id);
            if(patient is null) return BadRequest($"There is no patient with id {id}");

            context.Remove(patient);

            await context.SaveChangesAsync();

            return Ok();
        }
    }
}