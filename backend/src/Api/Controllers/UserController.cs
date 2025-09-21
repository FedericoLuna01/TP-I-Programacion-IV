using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Dtos.User;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;

        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateUserDto userDto)
        {
            var user = new User
            {
                Email = userDto.Email,
                Role = userDto.Role,
                Username = userDto.Username,
                PasswordHash = userDto.Password
            };

            _userRepo.Create(user);

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userRepo.GetAll();
            // TODO: Pasar el dto para no pasar la password
            return Ok(users);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted = _userRepo.Delete(id);
            if (!deleted)
            {
                return NotFound("User not found");
            }
            return NoContent();
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetUserById([FromRoute] int id)
        {
            var user = _userRepo.GetById(id);

            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, UpdateUserDto updateUser)
        {

            var user = new User
            {
                Avatar = updateUser.Avatar,
                Banner = updateUser.Banner,
                Role = updateUser.Role,
                Username = updateUser.Username
            };

            var updatedUser = _userRepo.Update(id, user);

            if (updatedUser == null)
            {
                return NotFound("User not found");
            }

            return Ok(updatedUser);
        }
    }
    

}