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
        /// <remarks></remarks>
        /// <returns></returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpGet("{type}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ExaminationDTO>>> ReadExaminationsByType(ExaminationType type)
        {
            List<ExaminationList> tmp = new List<ExaminationList>();
            tmp = await context.ExaminationLists.Where(examination => examination.Type == type).ToListAsync();
            List<ExaminationDTO> listToRet= new List<ExaminationDTO>();
            foreach(var e in tmp) listToRet.Add(new ExaminationDTO(e));

            return listToRet;
        }

        /// <summary>
        /// Creates new examination
        /// </summary>
        /// <param name="newExamination">DTO containing information of new examination</param>
        /// <returns>ExaminationDTO from created examination</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ExaminationDTO>> Create(ExaminationDTO newExamination)
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
        /// Updates examination with new given values.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="examinationDTO"></param>
        /// <remarks>Values can be null.</remarks>
        /// <returns></returns>
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
        /// <param name="id"></param>
        /// <remarks></remarks>
        /// <returns></returns>
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