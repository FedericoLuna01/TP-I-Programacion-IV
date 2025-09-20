using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain.Dtos.User
{
    public class UpdateUserDto
    {
        public string Username { get; set; } = string.Empty;
        public UserRole Role { get; set; }
        public string Avatar { get; set; } = string.Empty;
        public string Banner { get; set; } = string.Empty;
    }
}