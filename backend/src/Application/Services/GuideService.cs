using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.DTOs.Guide;
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

        public GuideDto Create(string title, string description, string content,
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

            var createdGuide = _guideRepo.Create(guide);

            return GuideDto.Create(createdGuide);
        }

        public IEnumerable<GuideDto> GetAll()
        {
            var guides = _guideRepo.GetAll();
            return GuideDto.Create(guides);
        }

        public GuideDto GetById(int id)
        {
            var guide = _guideRepo.GetById(id) ?? throw new KeyNotFoundException($"Guide with id {id} not found");
            return GuideDto.Create(guide);
        }

        public GuideDto Update(int id, string title, string description, string content, DifficultyLevel difficulty, string image, List<string> tags)
        {
            var existingGuide = _guideRepo.GetById(id);
            if (existingGuide == null) throw new KeyNotFoundException($"Guide with id {id} not found");

            var guide = new Guide
            {
                Id = id,
                Title = title,
                Description = description,
                Content = content,
                Difficulty = difficulty,
                Image = image,
                Tags = tags,
                AuthorId = existingGuide.AuthorId,
                GameId = existingGuide.GameId,
                CreatedAt = existingGuide.CreatedAt
            };
            var updateGuide = _guideRepo.Update(id, guide) ?? throw new KeyNotFoundException($"Guide with id {id} not found.");
            return GuideDto.Create(updateGuide);
        }

        public void Delete(int id)
        {
            var guide = _guideRepo.Delete(id) ?? throw new KeyNotFoundException($"Guide with id {id} not found");
        }

    }
}
