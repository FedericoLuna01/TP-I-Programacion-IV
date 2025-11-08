using Api.Models.Game;
using Api.Models.Guide;
using Domain.Entities;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        public IActionResult Create([FromBody] CreateGameRequest gameDto)
        {
            var createdGame = _gameService.Create(gameDto.Name,
                gameDto.Description,
                gameDto.Category,
                gameDto.Image,
                gameDto.UserId);
            return CreatedAtAction(nameof(GetById), new { id = createdGame.Id }, createdGame);
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
        [Authorize]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            _gameService.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [Authorize]
        [Route("{id}")]
        public ActionResult<Game> UpdateGame([FromRoute] int id, [FromBody] UpdateGameRequest updateDto)
        {

            var updateGame = _gameService.Update(id, updateDto.Name, updateDto.Description, updateDto.Category, updateDto.Image);

            return updateGame;
        }
    }
}