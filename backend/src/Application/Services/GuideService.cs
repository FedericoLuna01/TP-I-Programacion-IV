using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;

namespace Application.Services
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
            var guides = _guideRepo.GetAll();
            return guides;
        }

        public Guide GetById(int id)
        {
            return _guideRepo.GetById(id) ?? throw new KeyNotFoundException($"Guide with id {id} not found");
        }

        public Guide Update(int id, string title, string description, string content, DifficultyLevel difficulty, string image, List<string> tags)
        {
            var guide = new Guide
            {
                Title = title,
                Description = description,
                Content = content,
                Difficulty = difficulty,
                Image = image,
                Tags = tags
            };
            var updateGuide = _guideRepo.Update(id, guide) ?? throw new KeyNotFoundException($"Guide with id {id} not found.");
            return updateGuide;
        }

        public void Delete(int id)
        {
            var guide = _guideRepo.Delete(id) ?? throw new KeyNotFoundException($"Guide with id {id} not found");
        }

    }
}
