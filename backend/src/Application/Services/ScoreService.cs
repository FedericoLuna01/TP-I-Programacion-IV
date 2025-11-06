using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class ScoreService
    {
        private readonly IScoreRepository _scoreRepo;


        public ScoreService(IScoreRepository scoreRepo)
        {
            _scoreRepo = scoreRepo;
        }

         public Score Create(int scoreValue, string comment, int userId, int guideId)
        {
            var score = new Score
            {
                ScoreValue = scoreValue,
                Comment = comment,
                UserId = userId,
                GuideId = guideId
            };

            return _scoreRepo.Create(score);
        }

        public IEnumerable<Score> GetAll()
        {
            return _scoreRepo.GetAll();
        }

        public Score GetById(int id)
        {
            return _scoreRepo.GetById(id) ?? throw new KeyNotFoundException($"Score with id {id} not found");
        }

        public Score Update(int id, string comment)
        {
            var score = new Score
            {
                Comment = comment
            };
            return _scoreRepo.Update(id, score) ?? throw new KeyNotFoundException($"Score with id {id} not found");
        }

        public void Delete(int id)
        {
            _scoreRepo.Delete(id);
        }
    }
}
