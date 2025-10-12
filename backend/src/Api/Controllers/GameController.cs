using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Game;
using Api.Models.Guide;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/game")]
    public class GameController : ControllerBase
    {
        private readonly GameService _gameService;
        public GameController(GameService gameService)
        {
            _gameService = gameService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateGameRequest gameDto)
        {
            // TODO: Preguntar si este mapeo lo tengo que hacer aca o en service
            var newGame = new Game
            {
                Name = gameDto.Name,
                Description = gameDto.Description,
                Category = gameDto.Category,
                Image = gameDto.Image,
                UserId = gameDto.UserId
            };

            _gameService.Create(newGame);
            return CreatedAtAction(nameof(GetById), new { id = newGame.Id }, newGame);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Game>> GetAll()
        {
            var games = _gameService.GetAll();
            return Ok(games);
        }

        [HttpGet("{id}")]
        public ActionResult<Game> GetById([FromRoute] int id)
        {
            var game = _gameService.GetById(id);

            return game;
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            _gameService.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<Game> UpdateGame([FromRoute] int id, UpdateGameRequest updateDto)
        {
            var game = new Game
            {
                Name = updateDto.Name,
                Description = updateDto.Description,
                Category = updateDto.Category,
                Image = updateDto.Image
            };
            var updateGame = _gameService.Update(id, game);

            return updateGame;
        }
    }
}