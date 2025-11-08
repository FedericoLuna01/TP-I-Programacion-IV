using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GuideRepository : GenericRepository<Guide>, IGuideRepository
    {

        public GuideRepository(ApplicationDbContext context) : base(context)
        {
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
            _context.Entry(guide).Reference(g => g.Author).Load();

            return guide;
        }

        public override List<Guide> GetAll()
        {
            return _context.Guides
                .Include(g => g.Author)
                .ToList();
        }

        public override Guide? GetById(object id)
        {
            return _context.Guides
                .Include(g => g.Author)
                .FirstOrDefault(g => g.Id.Equals(id));
        }

        public override Guide? Update(object id, Guide updateGuide)
        {
            var guide = _context.Guides.Find(id);
            if (guide == null) return null;

            guide.Title = updateGuide.Title;
            guide.Description = updateGuide.Description;
            guide.Content = updateGuide.Content;
            guide.Difficulty = updateGuide.Difficulty;
            guide.Image = updateGuide.Image;
            guide.Tags = updateGuide.Tags;

            _context.SaveChanges();
            _context.Entry(guide).Reference(g => g.Author).Load();
            _context.Entry(guide).Reference(g => g.Game).Load();

            return guide;
        }

    }
}
