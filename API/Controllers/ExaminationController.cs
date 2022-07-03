using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.Examination;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ExaminationController: BaseApiController
    {
        public DataContext context { get; set;}
        public ExaminationController(DataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Returns all examinations from given type
        /// </summary>
        /// <param name="type">Type of examination:
        ///public enum ExaminationType{
        /// PHYSICAL,
        /// LABORATORY
        ///}
        ///</param>
        /// <remarks>Can be accessed by any role</remarks>
        /// <returns></returns>
        [Authorize]
        [HttpGet("{type}")]
        public async Task<ActionResult<List<ExaminationDTO>>> ReadExaminationsByType(ExaminationType type)
        {
            List<ExaminationList> tmp = new List<ExaminationList>();
            tmp = await context.ExaminationLists.Where(examination => examination.Type == type).ToListAsync();
            List<ExaminationDTO> listToRet= new List<ExaminationDTO>();
            foreach(var e in tmp) listToRet.Add(new ExaminationDTO(e));

            return listToRet;
        }

        /// <summary>
        /// Creates new examination type
        /// </summary>
        /// <param name="newExamination">DTO containing information of new examination</param>
        /// <remarks>Can be accessed only by admin</remarks>
        /// <returns>ExaminationDTO from created examination</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<ExaminationDTO>> Create(NewExaminationDTO newExamination)
        {
            var registrantId = GetRequesterId();
            if(registrantId == -1) return BadRequest($"You can not create new examination!");
            
            
            var examination = new ExaminationList{
                Name=newExamination.Name,
                Type= newExamination.Type,
                Icd=newExamination.Icd
            };

            context.ExaminationLists.Add(examination);

            await context.SaveChangesAsync();

            return new ExaminationDTO(examination);
        }

        /// <summary>
        /// Updates examination type with new given values.
        /// </summary>
        /// <param name="id">Id of examination type</param>
        /// <param name="examinationDTO">New details of examination type</param>
        /// <remarks>Can be accessed only by admin</remarks>
        /// <returns>Updated Examination type</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ExaminationDTO>> Update(int id, UpdateExaminationDTO examinationDTO)
        {
            var examination = await context.ExaminationLists.FirstOrDefaultAsync(v => v.Id == id);
            if(examination is null) return BadRequest($"There is no examination with id {id}");

            if(examinationDTO.Name is not null) examination.Name = examinationDTO.Name;
            if(examinationDTO.Icd is not null) examination.Icd = examinationDTO.Icd;
            if(examinationDTO.Type is not null) examination.Type = examinationDTO.Type ?? default;

            await context.SaveChangesAsync();

            return new ExaminationDTO(examination);
        }

        
        /// <summary>
        /// Deletes examination with given id.
        /// </summary>
        /// <param name="id">Id of examination type</param>
        /// <remarks>Can be accessed only by admin</remarks>
        /// <returns>Status code</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(int id)
        {
            var examination = await context.ExaminationLists.FirstOrDefaultAsync(v => v.Id == id);
            if(examination is null) return BadRequest($"There is no examination with id {id}");

            context.Remove(examination);

            await context.SaveChangesAsync();

            return Ok();
        }


        

    }


}