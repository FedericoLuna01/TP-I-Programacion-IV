using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Users;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUserRequest userDto)
        {
            var user = new User
            {
                Email = userDto.Email,
                Role = userDto.Role,
                Username = userDto.Username,
                PasswordHash = userDto.Password
            };

            _userService.Create(user);

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }


        [HttpGet]
        public ActionResult<List<UserDto>> GetAll()
        {
            var users = _userService.GetAll();
            return UserDto.Create(users);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);

            return NoContent();
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<UserDto> GetUserById([FromRoute] int id)
        {
            var user = _userService.GetById(id);

            return UserDto.Create(user);
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, UpdateUserRequest updateUser)
        {
            var user = new User
            {
                Avatar = updateUser.Avatar,
                Banner = updateUser.Banner,
                Role = updateUser.Role,
                Username = updateUser.Username
            };

            var updatedUser = _userService.Update(id, user);

            return Ok(updatedUser);
        }
    }


}