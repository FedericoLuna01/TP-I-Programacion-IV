using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Score;
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

        public ScoreDto Create(int scoreValue, string comment, int userId, int guideId)
        {
            var score = new Score
            {
                ScoreValue = scoreValue,
                Comment = comment,
                UserId = userId,
                GuideId = guideId
            };

            var createdScore = _scoreRepo.Create(score);

            return ScoreDto.Create(createdScore);
        }

        public IEnumerable<ScoreDto> GetAll()
        {
            return ScoreDto.Create(_scoreRepo.GetAll());
        }

        public ScoreDto GetById(int id)
        {
            return ScoreDto.Create(_scoreRepo.GetById(id) ?? throw new KeyNotFoundException($"Score with id {id} not found"));
        }

        public ScoreDto Update(int id,int scoreValue, string comment)
        {
            var score = new Score
            {
                ScoreValue = scoreValue,
                Comment = comment
            };

            var updatedScore = _scoreRepo.Update(id, score) ?? throw new KeyNotFoundException($"Score with id {id} not found");

            return ScoreDto.Create(updatedScore);
        }

        public void Delete(int id)
        {
            var score = _scoreRepo.Delete(id) ?? throw new KeyNotFoundException($"Score with id {id} not found.");
        }
    }
}
