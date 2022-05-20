using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey key;
        public TokenService(IConfiguration config)
        {
            //This key should be in appsettings.development.json: "TokenKey": "super secret key",
            //But just to make sure that you can access this service a dev key is hard coded 
            if(config["TokenKey"] != null) this.key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            else this.key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret dev key"));
        }

        //Created token claims username and not a role of the user
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName),
                new Claim("UserId", user.Id.ToString()),
                new Claim(user.Role.ToString(), "true") 
            };


            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}