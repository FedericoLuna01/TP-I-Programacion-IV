using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;

namespace Domain.Services
{
    public class GuideService
    {
        private readonly IGuideRepository _guideRepo;

        public GuideService(IGuideRepository guideRepo)
        {
            _guideRepo = guideRepo;
        }

        public Guide Create(string title, string description, string content,
        DifficultyLevel difficulty, string image, List<string> tags, int authorId, int gameId)
        {
            var guide = new Guide
            {
                Title = title,
                Description = description,
                Content = content,
                Difficulty = difficulty,
                Image = image,
                Tags = tags,
                AuthorId = authorId,
                GameId = gameId
            };
            return _guideRepo.Create(guide);
        }

        public IEnumerable<Guide> GetAll()
        {
            return _guideRepo.GetAll();
        }

        public Guide GetById(int id)
        {
            return _guideRepo.GetById(id) ?? throw new KeyNotFoundException($"Guide with id ${id} not found");
        }
    }
}