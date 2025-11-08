using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Application.Dtos.Users;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
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