using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GameRepository : GenericRepository<Game>, IGameRepository
    {
        public GameRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public override Game Create(Game createGame)
        {
            if (createGame.UserId != 0)
            {
                var user = _context.Users.Find(createGame.UserId);
                if (user != null)
                {
                    createGame.User = user;
                }
            }

            _dbSet.Add(createGame);
            _context.SaveChanges();
            return createGame;
        }

        public override Game? Update(object id, Game updateGame)
        {
            var game = _dbSet.Find(id);
            if (game == null) return null;

            game.Name = updateGame.Name;
            game.Description = updateGame.Description;
            game.Category = updateGame.Category;
            game.Image = updateGame.Image;

            _context.SaveChanges();
            return game;
        }
    }
}
