using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GuideRepository : IGuideRepository
    {

        private readonly ApplicationDbContext _context;

        public GuideRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public Guide Create(Guide guide)
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

        public List<Guide> GetAll()
        {
            // TODO: Cuando traigo esto, trae toda la guía que esta bien y el Author, pero este author trae todas las guías
            var guides = _context.Guides.Include(x => x.Author).ToList();
            return guides;
        }

        public Guide? GetById(int id)
        {
            // var guide = _context.Guides.FirstOrDefault(x => x.Id == id);
            // var guide = _context.Guides.Select(x => x.Id == id);
            var guide = _context.Guides.Find(id);

            return guide;
        }
    }
}