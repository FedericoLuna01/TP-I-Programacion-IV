using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GuideRepository : GenericRepository<Guide>, IGuideRepository
    {
        private readonly ApplicationDbContext _context;

        public GuideRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public override Guide Create(Guide guide)
        {
            if (guide.AuthorId != 0)
            {
                var author = _context.Users.Find(guide.AuthorId);
                if (author != null)
                {
                    guide.Author = author;
                }
            }

            _context.Guides.Add(guide);
            _context.SaveChanges();
            return guide;
        }

        public override List<Guide> GetAll()
        {
            return _context.Guides
                .Include(g => g.Author)
                .ToList();
        }
    }
}
