using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Application.Dtos.Users
{
    public record CreateUserRequest
    (
        [Required]
        string Username,
        [EmailAddress]
        string Email,
        [Required]
        string Password,
        UserRole Role = UserRole.User
    );
}