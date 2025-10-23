using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class ScoreRepository : IScoreRepository
    {

        private readonly ApplicationDbContext _context;
        public ScoreRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }


        public Score Create(Score createScore)
        {
            if (createScore.UserId != 0)
            {
                var user = _context.Users.Find(createScore.UserId);
                if (user != null)
                {
                    createScore.User = user;
                }
            }
            if (createScore.GuideId != 0)
            {
                var guide = _context.Guides.Find(createScore.GuideId);
                if (guide != null)
                {
                    createScore.Guide = guide;
                }
            }

            _context.Scores.Add(createScore);
            _context.SaveChanges();
            return createScore;
        }

        public void Delete(int id)
        {
            var score = _context.Scores.Find(id) ?? throw new KeyNotFoundException($"Score with id {id} not found");
            _context.Scores.Remove(score);
            _context.SaveChanges();
        }

        public List<Score> GetAll()
        {
            throw new NotImplementedException();
        }

        public Score? GetByGuide(int guideId)
        {
            throw new NotImplementedException();
        }

        public Score? GetById(int id)
        {
            return  _context.Scores.Find(id) ?? throw new KeyNotFoundException($"Score with id ${id} not found");
        }

        public Score Update(int id, Score updateScore)
        {
            var score = _context.Scores.Find(id) ?? throw new KeyNotFoundException($"Score with id ${id} not found");

            score.Comment = updateScore.Comment;

            _context.SaveChanges();

            return score;
        }
    }
}