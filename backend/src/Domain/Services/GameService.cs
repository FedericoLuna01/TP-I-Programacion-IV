using System;
using System.Collections.Generic;
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

        public void Create(Game newGame)
        {
            _gameRepo.Create(newGame);
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

        public Game Update(int id, Game updateGame)
        {
            var updatedGame = _gameRepo.Update(id, updateGame) ?? throw new KeyNotFoundException($"Game with id {id} not found.");
            return updatedGame;
        }

    }
}