using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class WhitelistDTO
    {
        public WhitelistDTO(Whitelist element)
        {
            this.Id=element.Id;
            this.Ip = element.Ip;
            this.IsEnabled = element.IsEnabled;
        }

        public int Id { get; set; }

        public string Ip { get; set; }

        public bool IsEnabled { get; set; }

    }
}