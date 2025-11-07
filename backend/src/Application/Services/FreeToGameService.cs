using Application.DTOs.FreeToGame;
using Application.Interfaces;

namespace Application.Services
{
    public class FreeToGameService : IFreeToGameService
    {
        private readonly IFreeToGameClient _client;

        public FreeToGameService(IFreeToGameClient client)
        {
            _client = client;
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetAllGamesAsync()
        {
            return await _client.GetAllGamesAsync();
        }

        public async Task<FreeToGameGameDetailDto?> GetGameByIdAsync(int gameId)
        {
            return await _client.GetGameByIdAsync(gameId);
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetGamesByCategoryAsync(string category)
        {
            return await _client.GetGamesByCategoryAsync(category);
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetGamesByPlatformAsync(string platform)
        {
            return await _client.GetGamesByPlatformAsync(platform);
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetGamesSortedAsync(string sortBy)
        {
            return await _client.GetGamesSortedAsync(sortBy);
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetGamesFilteredAsync(string? platform = null, string? category = null, string? sortBy = null)
        {
            return await _client.GetGamesFilteredAsync(platform, category, sortBy);
        }
    }
}
