using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Domain.Interfaces;

namespace Infrastructure.ExternalServices
{
    public class FreeToGameApiService : IExternalApiService
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonOptions;

        public FreeToGameApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
        }

        public async Task<T> GetAsync<T>(string endpoint)
        {
            try
            {
                var response = await _httpClient.GetAsync(endpoint);
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();
                
                var result = JsonSerializer.Deserialize<T>(json, _jsonOptions);
                return result ?? throw new InvalidOperationException("Failed to deserialize response");
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error calling FreeToGame API: {ex.Message}", ex);
            }
            catch (JsonException ex)
            {
                throw new Exception($"Error parsing FreeToGame API response: {ex.Message}", ex);
            }
        }

        public async Task<List<T>> GetListAsync<T>(string endpoint)
        {
            try
            {
                var response = await _httpClient.GetAsync(endpoint);
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();
                
                var result = JsonSerializer.Deserialize<List<T>>(json, _jsonOptions);
                return result ?? new List<T>();
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error calling FreeToGame API: {ex.Message}", ex);
            }
            catch (JsonException ex)
            {
                throw new Exception($"Error parsing FreeToGame API response: {ex.Message}", ex);
            }
        }

    }
}