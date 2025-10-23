using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IScoreRepository
    {
        Score Create(Score createScore);
        List<Score> GetAll();
        Score? GetById(int id);
        Score? GetByGuide(int guideId);
        void Delete(int id);
        Score Update(int id, Score updateScore);
    }
}