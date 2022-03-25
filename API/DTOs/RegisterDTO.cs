using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "Password must have between 8-20 characters")]
        public string Password { get; set; }

        [Range(0,2)]
        [Required]
        public int Role { get; set; }
    }
}