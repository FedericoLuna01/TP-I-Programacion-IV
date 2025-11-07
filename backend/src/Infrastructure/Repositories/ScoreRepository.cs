using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class ScoreRepository : GenericRepository<Score>, IScoreRepository
    {
        private readonly ApplicationDbContext _context;

        public ScoreRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public Score? GetByGuide(int guideId)
        {
            return _context.Scores.FirstOrDefault(s => s.GuideId == guideId);
        }
    }
}
