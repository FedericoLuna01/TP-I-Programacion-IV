using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Dtos.Users;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly AuthenticationService _authService;

        public AuthenticationController(AuthenticationService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginUserRequest user)
        {
            var token = _authService.Authenticate(user.Email, user.Password);
            return Ok(new { Token = token });
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] RegisterUserRequest user)
        {
            var createdUser = _authService.Register(user.Email, user.Password, user.Username);
            return Ok(createdUser);
        }

    }
}