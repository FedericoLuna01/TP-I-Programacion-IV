using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FreeToGameController : ControllerBase
    {
        private readonly IFreeToGameService _freeToGameService;

        public FreeToGameController(IFreeToGameService freeToGameService)
        {
            _freeToGameService = freeToGameService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGames()
        {
            var games = await _freeToGameService.GetAllGamesAsync();
            return Ok(games);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGameById(int id)
        {
            var game = await _freeToGameService.GetGameByIdAsync(id);
            
            if (game == null)
                return NotFound(new { message = $"Game with ID {id} not found" });

            return Ok(game);
        }

        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetGamesByCategory(string category)
        {
            var games = await _freeToGameService.GetGamesByCategoryAsync(category);
            return Ok(games);
        }

        [HttpGet("platform/{platform}")]
        public async Task<IActionResult> GetGamesByPlatform(string platform)
        {
            var games = await _freeToGameService.GetGamesByPlatformAsync(platform);
            return Ok(games);
        }

        [HttpGet("sorted/{sortBy}")]
        public async Task<IActionResult> GetGamesSorted(string sortBy)
        {
            var games = await _freeToGameService.GetGamesSortedAsync(sortBy);
            return Ok(games);
        }

        [HttpGet("filtered")]
        public async Task<IActionResult> GetGamesFiltered(
            [FromQuery] string? platform = null,
            [FromQuery] string? category = null,
            [FromQuery] string? sortBy = null)
        {
            var games = await _freeToGameService.GetGamesFilteredAsync(platform, category, sortBy);
            return Ok(games);
        }
    }
}
