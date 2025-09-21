using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Dtos.Game;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/game")]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepo;
        public GameController(IGameRepository gameRepository)
        {
            _gameRepo = gameRepository;
        }
        [HttpPost]
        public IActionResult Create([FromBody] CreateGameDto gameDto)
        {
            var newGame = new Game
            {
                Name = gameDto.Name,
                Description = gameDto.Description,
                Category = gameDto.Category,
                Image = gameDto.Image,
                UserId = gameDto.UserId
            };

            var createdGame = _gameRepo.Create(newGame);
            return Ok(createdGame);
        }
    }
}