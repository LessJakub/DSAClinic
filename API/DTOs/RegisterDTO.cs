using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Annotations;
using API.Entities;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [UsernameAnnotation]
        public string Username { get; set; }

        [Required]
        [PasswordAnnotation]
        public string Password { get; set; }

        [Range(0,5)]
        [Required]
        public int Role { get; set; }
    }
}