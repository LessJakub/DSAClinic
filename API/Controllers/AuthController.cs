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


        //Requires login only, a policy should be made to use that.
        //Should be GET
        [Authorize(Policy = "AdminOnly")]
        [HttpGet("users")]
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            return this.context.Users.ToList();
        }


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

        private async Task<Boolean> UserExists(string username)
        {
            return await context.Users.AnyAsync(x => x.UserName == username);
        }

    }
}