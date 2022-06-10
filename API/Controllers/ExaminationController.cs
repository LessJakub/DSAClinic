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
        [AllowAnonymous]
        [HttpGet("{type}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<ExaminationDTO>>> ReadAllExaminations(int type)
        {
            List<ExaminationList> tmp = new List<ExaminationList>();
            tmp = await context.ExaminationLists.Where(examination => examination.Type == (ExaminationType)type).ToListAsync();
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
        [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ExaminationDTO>> Create(ExaminationDTO newExamination)
        {
            //Check if requester is registrant, this function returns -1 if not.
            var registrantId = GetRequesterId();
            if(registrantId==-1) return BadRequest($"You can not create new examination!");
            
            
            var examination = new ExaminationList{
                Name=newExamination.Name,
                Type= newExamination.Type,
                Icd=newExamination.Icd
            };

            context.ExaminationLists.Add(examination);

            await context.SaveChangesAsync();

            return new ExaminationDTO(examination);
        }

    }


}