using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Game;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class GameService
    {
        private readonly IGameRepository _gameRepo;
        public GameService(IGameRepository gameRepository)
        {
            _gameRepo = gameRepository;
        }

        public GameDto Create(string name, string description, string category, string image, int userId)
        {
            var newGame = new Game
            {
                Name = name,
                Description = description,
                Category = category,
                Image = image,
                UserId = userId
            };
            var createdGame = _gameRepo.Create(newGame);
            return GameDto.Create(createdGame);
        }

        public IEnumerable<GameDto> GetAll()
        {
            var games = _gameRepo.GetAll();
            return GameDto.Create(games);
        }

        public GameDto GetById(int id)
        {

            var game = _gameRepo.GetById(id) ?? throw new KeyNotFoundException($"Game with id {id} not found.");
            return GameDto.Create(game);
        }

        public void Delete(int id)
        {
            var game = _gameRepo.Delete(id) ?? throw new KeyNotFoundException($"Game with id {id} not found.");
        }

        public GameDto Update(int id, string name, string description, string category, string image)
        {
            var game = new Game
            {
                Name = name,
                Description = description,
                Category = category,
                Image = image
            };
            var updatedGame = _gameRepo.Update(id, game) ?? throw new KeyNotFoundException($"Game with id {id} not found.");
            return GameDto.Create(updatedGame);
        }

    }
}
