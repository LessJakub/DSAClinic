using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected int GetRequesterId()
        {
            var principal = HttpContext.User;
            if (principal?.Claims == null) return -1;

            var idClaim = principal.FindFirst("UserId");
            if (idClaim == null) return -1;

            return Int32.Parse(idClaim.Value);
        }
    }

    
}