using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Dtos.Game;
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
            _context.Games.Add(createGame);
            _context.SaveChanges();
            return createGame;
        }
    }
}