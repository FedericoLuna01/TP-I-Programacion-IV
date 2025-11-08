using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Application.Dtos.Users
{
    public record UpdateUserRequest
    (
        string Username,
        UserRole Role,
        string Avatar,
        string Banner
    );
}