using Application.DTOs.FreeToGame;

namespace Application.Interfaces
{
    public interface IFreeToGameClient
    {
        Task<IEnumerable<FreeToGameGameDto>> GetAllGamesAsync();
        Task<FreeToGameGameDetailDto?> GetGameByIdAsync(int gameId);
        Task<IEnumerable<FreeToGameGameDto>> GetGamesByCategoryAsync(string category);
        Task<IEnumerable<FreeToGameGameDto>> GetGamesByPlatformAsync(string platform);
        Task<IEnumerable<FreeToGameGameDto>> GetGamesSortedAsync(string sortBy);
        Task<IEnumerable<FreeToGameGameDto>> GetGamesFilteredAsync(string? platform = null, string? category = null, string? sortBy = null);
    }
}
