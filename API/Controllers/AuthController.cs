using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AuthController : BaseApiController
    {
        private readonly DataContext context;
        private readonly ITokenService tokenService;

        public AuthController(DataContext context, ITokenService tokenService)
        {
            this.context = context;
            this.tokenService = tokenService;
        }

        /// <summary>
        /// Enumarete all users. Requires Admin claim
        /// </summary>
        /// <remarks>Test method</remarks>
        /// <returns>List of all users</returns>
        [Authorize(Policy = "AdminOnly")]
        [HttpGet("users")]
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            return this.context.Users.ToList();
        }

        /// <summary>
        /// Registers
        /// </summary>
        /// <param name="registerDTO">DTO with users inormation</param>
        /// <remarks>Can be requested only by admin</remarks>
        /// <returns>Authorization information of created user</returns>
        /// <response code="200"> Ok, new user is created. </response>
        /// <response code="400"> Bad request, invalid input. </response>
        [Authorize(Policy = "AdminOnly")]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if(await UserExists(registerDTO.Username)) return BadRequest("Username is taken");


            //Used for encoding
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDTO.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PasswordSalt = hmac.Key,
                Role = (Roles)registerDTO.Role
            };
            
            //Add created user to objects tracked by context (NOT TO THE DB)
            context.Users.Add(user);

            //Actually add user to the DB.
            await context.SaveChangesAsync();

            return new UserDTO{
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        /// <summary>
        /// Log in as existing user
        /// </summary>
        /// <param name="loginDTO">Login information</param>
        /// <remarks>Anyone can access this endpoint</remarks>
        /// <returns>Authorization information of user</returns>
        /// <response code="200"> Ok,user is loged in </response>
        /// <response code="400"> Bard request, invalid input </response>
        /// <response code="401"> Unauthorized, wrong credentials </response>
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            //Finds element in DB, throws exception if more than one element is found
            var user = await context.Users.SingleOrDefaultAsync(dbEntry => dbEntry.UserName == loginDTO.Username);

            if(user == null) return Unauthorized("Invalid username");


            using var hmac = new HMACSHA512(user.PasswordSalt);


            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for(int i = 0; i < computeHash.Length; i++)
            {
                if(computeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }
            return new UserDTO{
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        /// <summary>
        /// Changes username or passowrd of existing user
        /// </summary>
        /// <param name="id">Id of the user</param>
        /// <param name="updateDto">User information information</param>
        /// <remarks>Requires Admin claim. Information that can be changed depends on UserUpdateDto</remarks>
        /// <returns>UserDto with username and valid token</returns>
        /// <response code="200"> Ok, Username or password changed. </response>
        /// <response code="400"> Bad request, invalid input. </response>
        /// <response code="401"> Unauthorized, User has different id or is not admin. </response>
        [Authorize("AdminOnly")]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<UserDTO>> UpdateUser(int id, UserUpdateDTO updateDto)
        {
            var user = await context.Users.FindAsync(id);
    
            if(updateDto.Username != null && updateDto.Username != user.UserName) 
            {
                if(!await UserExists(updateDto.Username)) user.UserName = updateDto.Username;
                else return BadRequest("Username is taken");
            }

            if(updateDto.Password != null)
            {
                using var hmac = new HMACSHA512();

                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(updateDto.Password));
                user.PasswordSalt = hmac.Key;
            }

            await context.SaveChangesAsync();

            return new UserDTO
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        /// <summary>
        /// Deletes existing user.
        /// </summary>
        /// <param name="id">Id of the user</param>
        /// <remarks></remarks>
        /// <returns>Status code of action resault</returns>
        /// <response code="200"> Ok, user was deleted succesfully </response>
        /// <response code="400"> Bad request, invalid input. </response>
        /// <response code="401"> Unauthorized, User has different id or is not admin. </response>
        /// <response code="204"> User with specified id was not found. </response>
        [Authorize("AdminOnly")]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await context.Users.FindAsync(id);

            if(user != null)
            {
                context.Remove(user);
                await context.SaveChangesAsync();
                return Ok();
            }
            return NoContent();
        }

        private async Task<Boolean> UserExists(string username)
        {
            return await context.Users.AnyAsync(x => x.UserName == username);
        }

    }
}