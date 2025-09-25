using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enums;

namespace Api.Models
{
    public record UserDto(string Username, string Email, string Password, UserRole Role)
    {
        public static UserDto Create(User user)
        {
            var dto = new UserDto(user.Username, user.Email, user.PasswordHash, user.Role);

            return dto;
        }

        public static List<UserDto> Create(IEnumerable<User> users)
        {
            var listDto = new List<UserDto>();
            foreach (var user in users)
            {
                listDto.Add(UserDto.Create(user));
            }

            return listDto;
        }
    }
}