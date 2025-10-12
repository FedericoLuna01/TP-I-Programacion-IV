using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
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

        public Guide Create(Guide guide)
        {
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