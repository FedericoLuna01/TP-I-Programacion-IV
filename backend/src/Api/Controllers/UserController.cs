using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Users;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
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
            var createdUser = _userService.Create(userDto.Email, userDto.Role, userDto.Username, userDto.Password);

            return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);
        }

        [HttpGet]
        [Authorize]
        public ActionResult<List<UserDto>> GetAll()
        {
            var users = _userService.GetAll();
            return UserDto.Create(users);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);

            return NoContent();
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<UserDto> GetById([FromRoute] int id)
        {
            var user = _userService.GetById(id);

            return UserDto.Create(user);
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, UpdateUserRequest updateUser)
        {
            var updatedUser = _userService.Update(id, updateUser.Avatar, updateUser.Banner, updateUser.Role, updateUser.Username);

            return Ok(updatedUser);
        }
    }


}