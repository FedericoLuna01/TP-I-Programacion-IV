using Api.Models.FreeToGame;
using Application.DTOs.FreeToGame;
using Application.Interfaces;
using System.Text.Json;

namespace Api.Clients
{
    public class FreeToGameClient : IFreeToGameClient
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonOptions;

        public FreeToGameClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetAllGamesAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("/api/games");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var games = JsonSerializer.Deserialize<List<FreeToGameGame>>(content, _jsonOptions);

                return MapToDto(games ?? new List<FreeToGameGame>());
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error fetching games from FreeToGame API: {ex.Message}", ex);
            }
            catch (JsonException ex)
            {
                throw new Exception($"Error deserializing games response: {ex.Message}", ex);
            }
        }

        public async Task<FreeToGameGameDetailDto?> GetGameByIdAsync(int gameId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/api/game?id={gameId}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var game = JsonSerializer.Deserialize<FreeToGameGameDetail>(content, _jsonOptions);

                return game != null ? MapToDetailDto(game) : null;
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error fetching game {gameId} from FreeToGame API: {ex.Message}", ex);
            }
            catch (JsonException ex)
            {
                throw new Exception($"Error deserializing game detail response: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetGamesByCategoryAsync(string category)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/api/games?category={category}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var games = JsonSerializer.Deserialize<List<FreeToGameGame>>(content, _jsonOptions);

                return MapToDto(games ?? new List<FreeToGameGame>());
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error fetching games by category '{category}' from FreeToGame API: {ex.Message}", ex);
            }
            catch (JsonException ex)
            {
                throw new Exception($"Error deserializing games response: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetGamesByPlatformAsync(string platform)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/api/games?platform={platform}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var games = JsonSerializer.Deserialize<List<FreeToGameGame>>(content, _jsonOptions);

                return MapToDto(games ?? new List<FreeToGameGame>());
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error fetching games by platform '{platform}' from FreeToGame API: {ex.Message}", ex);
            }
            catch (JsonException ex)
            {
                throw new Exception($"Error deserializing games response: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetGamesSortedAsync(string sortBy)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/api/games?sort-by={sortBy}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var games = JsonSerializer.Deserialize<List<FreeToGameGame>>(content, _jsonOptions);

                return MapToDto(games ?? new List<FreeToGameGame>());
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error fetching games sorted by '{sortBy}' from FreeToGame API: {ex.Message}", ex);
            }
            catch (JsonException ex)
            {
                throw new Exception($"Error deserializing games response: {ex.Message}", ex);
            }
        }

        public async Task<IEnumerable<FreeToGameGameDto>> GetGamesFilteredAsync(string? platform = null, string? category = null, string? sortBy = null)
        {
            try
            {
                var queryParams = new List<string>();

                if (!string.IsNullOrWhiteSpace(platform))
                    queryParams.Add($"platform={platform}");

                if (!string.IsNullOrWhiteSpace(category))
                    queryParams.Add($"category={category}");

                if (!string.IsNullOrWhiteSpace(sortBy))
                    queryParams.Add($"sort-by={sortBy}");

                var queryString = queryParams.Count > 0 ? "?" + string.Join("&", queryParams) : "";
                var response = await _httpClient.GetAsync($"/api/games{queryString}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var games = JsonSerializer.Deserialize<List<FreeToGameGame>>(content, _jsonOptions);

                return MapToDto(games ?? new List<FreeToGameGame>());
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error fetching filtered games from FreeToGame API: {ex.Message}", ex);
            }
            catch (JsonException ex)
            {
                throw new Exception($"Error deserializing games response: {ex.Message}", ex);
            }
        }

        // Métodos de mapeo privados
        private IEnumerable<FreeToGameGameDto> MapToDto(IEnumerable<FreeToGameGame> games)
        {
            return games.Select(game => new FreeToGameGameDto
            {
                Id = game.Id,
                Title = game.Title,
                Thumbnail = game.Thumbnail,
                ShortDescription = game.ShortDescription,
                GameUrl = game.GameUrl,
                Genre = game.Genre,
                Platform = game.Platform,
                Publisher = game.Publisher,
                Developer = game.Developer,
                ReleaseDate = game.ReleaseDate,
                FreeToGameProfileUrl = game.FreeToGameProfileUrl
            });
        }

        private FreeToGameGameDetailDto MapToDetailDto(FreeToGameGameDetail game)
        {
            return new FreeToGameGameDetailDto
            {
                Id = game.Id,
                Title = game.Title,
                Thumbnail = game.Thumbnail,
                Status = game.Status,
                ShortDescription = game.ShortDescription,
                Description = game.Description,
                GameUrl = game.GameUrl,
                Genre = game.Genre,
                Platform = game.Platform,
                Publisher = game.Publisher,
                Developer = game.Developer,
                ReleaseDate = game.ReleaseDate,
                FreeToGameProfileUrl = game.FreeToGameProfileUrl,
                MinimumSystemRequirements = game.MinimumSystemRequirements != null
                    ? new MinimumSystemRequirementsDto
                    {
                        Os = game.MinimumSystemRequirements.Os,
                        Processor = game.MinimumSystemRequirements.Processor,
                        Memory = game.MinimumSystemRequirements.Memory,
                        Graphics = game.MinimumSystemRequirements.Graphics,
                        Storage = game.MinimumSystemRequirements.Storage
                    }
                    : null,
                Screenshots = game.Screenshots.Select(s => new ScreenshotDto
                {
                    Id = s.Id,
                    Image = s.Image
                }).ToList()
            };
        }
    }
}
