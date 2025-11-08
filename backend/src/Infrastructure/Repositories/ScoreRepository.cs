using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ScoreRepository : GenericRepository<Score>, IScoreRepository
    {
       
        public ScoreRepository(ApplicationDbContext context) : base(context)
        {
         
        }

        public override Score Create(Score score)
        {
            if (score.UserId != 0)
            {
                var user = _context.Users.Find(score.UserId);
                if (user != null)
                {
                    score.User = user;
                }
            }
            _context.Scores.Add(score);
            _context.SaveChanges();
            return score;
        }

        public override List<Score> GetAll()
        {
            return _context.Scores.Include(s => s.User).ToList();
        }

        public Score? GetById(int id)
        {
            return _context.Scores.Include(s => s.User).FirstOrDefault(s => s.Id.Equals(id));
        }

        public override Score? Update(object id, Score updateScore)
        {
            var score = _context.Scores.Find(id);
            if (score == null) return null;

            score.ScoreValue = updateScore.ScoreValue;
            score.Comment = updateScore.Comment;

            _context.SaveChanges();
            _context.Entry(score).Reference(s => s.User).Load();

            return score;
        }
    }
}
