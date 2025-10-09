using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Game;
using Api.Models.Guide;
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
        public IActionResult Create([FromBody] CreateGameRequest gameDto)
        {
            var newGame = new Game
            {
                Name = gameDto.Name,
                Description = gameDto.Description,
                Category = gameDto.Category,
                Image = gameDto.Image,
                UserId = gameDto.UserId
            };

            _gameRepo.Create(newGame);
            return CreatedAtAction(nameof(GetById), new { id = newGame.Id }, newGame);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var games = _gameRepo.GetAll();
            return Ok(games);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var game = _gameRepo.GetById(id);

            if (game == null)
            {
                return NotFound("Game not found");
            }
            return Ok(game);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            var deletedGame = _gameRepo.Delete(id);
            if (deletedGame == null)
            {
                return NotFound("Game not found");
            }
            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateGame([FromRoute] int id, UpdateGameRequest updateDto)
        {
            var game = new Game
            {
                Name = updateDto.Name,
                Description = updateDto.Description,
                Category = updateDto.Category,
                Image = updateDto.Image
            };
            var updateGame = _gameRepo.Update(id, game);

            if (updateGame == null)
            {
                return NotFound("Game not found");
            }
            return Ok(updateGame);
        }
    }
}