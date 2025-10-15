using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Services
{
    public class ScoreService
    {
        private readonly IScoreRepository _scoreRepo;


        public ScoreService(IScoreRepository scoreRepo)
        {
            _scoreRepo = scoreRepo;
        }

         public Score Create(Score score)
        {
            return _scoreRepo.Create(score);
        }

        public IEnumerable<Score> GetAll()
        {
            return _scoreRepo.GetAll();
        }

        public Score GetById(int id)
        {
            return _scoreRepo.GetById(id) ?? throw new KeyNotFoundException($"Score with id ${id} not found");
        }
    }
}