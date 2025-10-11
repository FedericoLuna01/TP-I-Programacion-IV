using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.Entities;

namespace Api.Models.Users
{
    public record UserDto(string Email, string Username, UserRole Role, int Id)
    {
        public static UserDto Create(User entity)
        {
            var dto = new UserDto(entity.Email, entity.Username, entity.Role, entity.Id);

            return dto;
        }

        public static List<UserDto> Create(IEnumerable<User> entities)
        {
            List<UserDto> dtoList = [];

            foreach (var entity in entities)
            {
                dtoList.Add(UserDto.Create(entity));
            }

            return dtoList;
        }

    }
}