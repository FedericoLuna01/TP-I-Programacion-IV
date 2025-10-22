using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Services
{
    public class GameService
    {
        private readonly IGameRepository _gameRepo;
        public GameService(IGameRepository gameRepository)
        {
            _gameRepo = gameRepository;
        }

        public Game Create(string name, string description, string category, string image, int userId)
        {
            var newGame = new Game
            {
                Name = name,
                Description = description,
                Category = category,
                Image = image,
                UserId = userId
            };
            return _gameRepo.Create(newGame);
        }

        public IEnumerable<Game> GetAll()
        {
            return _gameRepo.GetAll();
        }

        public Game GetById(int id)
        {
            return _gameRepo.GetById(id) ?? throw new KeyNotFoundException($"Game with id {id} not found.");
        }

        public void Delete(int id)
        {
            var game = _gameRepo.Delete(id) ?? throw new KeyNotFoundException($"Game with id {id} not found.");
        }

        public Game Update(int id, string name, string description, string category, string image)
        {
            var game = new Game
            {
                Name = name,
                Description = description,
                Category = category,
                Image = image
            };
            var updatedGame = _gameRepo.Update(id, game) ?? throw new KeyNotFoundException($"Game with id {id} not found.");
            return updatedGame;
        }

    }
}