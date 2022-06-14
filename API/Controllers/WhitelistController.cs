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
    public class WhitelistController : BaseApiController
    {
        public DataContext context { get; set; }
        public WhitelistController(DataContext context)
        {
            this.context = context;
        }


        /// <summary>
        /// Creates new whitelist entry and adds it to the database.
        /// </summary>
        /// <param name="newElement"></param>
        /// <remarks></remarks>
        /// <returns>WhitelistDTO with detailed information.</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<WhitelistDTO>> Create(WhitelistDTO newElement)
        {
            var element = new Whitelist{
                Ip = newElement.Ip,
                IsEnabled = newElement.IsEnabled
            };
            
            context.IPWhitelist.Add(element);
            await context.SaveChangesAsync();
            return new WhitelistDTO(element);
        }



        /// <summary>
        /// Reads all whitelist entries.
        /// </summary>
        /// <remarks></remarks>
        /// <returns>All ip adresses in the database</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<WhitelistDTO>>> ReadAll()
        {
            var elements = new List<WhitelistDTO>();
            foreach(var element in await context.IPWhitelist.ToListAsync()) elements.Add(new WhitelistDTO(element));

            return elements;
        }

        /// <summary>
        /// Reads whitelist entry with specified id.
        /// </summary>
        /// <remarks></remarks>
        /// <returns>Detailed information about whitelist entry.</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<WhitelistDTO>> Read(int id)
        {
            var element = await context.IPWhitelist.FirstOrDefaultAsync(e => e.Id == id);
            if(element is null) return BadRequest($"There is no whitelist entry with id {id}");

            return new WhitelistDTO(element);
        }

        /// <summary>
        /// Updates whitelist entry enably value with given id.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="elementDTO"></param>
        /// <remarks></remarks>
        /// <returns>WhitelistDTO with detailed information.</returns>
        /// <response code="200">  </response>
        /// <response code="400">  </response>
        [Authorize]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<WhitelistDTO>> Update(int id, UpdateWhitelistDTO elementDTO)
        {
            var element = await context.IPWhitelist.FirstOrDefaultAsync(e => e.Id == id);
            if(element is null) return BadRequest($"There is no whitelist entry with id {id}");

            element.IsEnabled = elementDTO.IsEnabled;

            await context.SaveChangesAsync();
            return new WhitelistDTO(element);
        }

    }
}