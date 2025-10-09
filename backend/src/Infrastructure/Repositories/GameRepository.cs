using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class GameRepository : IGameRepository
    {
        private readonly ApplicationDbContext _context;
        public GameRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public Game Create(Game createGame)
        {
            if (createGame.UserId != 0)
            {
                var user = _context.Users.Find(createGame.UserId);
                if (user != null)
                {
                    createGame.User = user;
                }
            }

            _context.Games.Add(createGame);
            _context.SaveChanges();
            return createGame;
        }
        public Game? Delete(int id)
        {
            var game = _context.Games.Find(id);
            if (game != null)
            {
                _context.Games.Remove(game);
                _context.SaveChanges();
                return game;
            }
            return null;
        }
        // Fijarse el signo ? y el return null, ya que si no encuentra devuelve null

        public List<Game> GetAll()
        {
            var games = _context.Games.ToList();
            return games;
        }

        public Game? GetById(int id)
        {
            var game = _context.Games.Find(id);
            return game;
        }

        public Game? Update(int id, Game updateGame)
        {
            var game = _context.Games.Find(id);

            if (game == null)
            {
                return null;
            }

            game.Name = updateGame.Name;
            game.Description = updateGame.Description;
            game.Category = updateGame.Category;
            game.Image = updateGame.Image;

            _context.SaveChanges();
            
            return game;
        }
    }
}