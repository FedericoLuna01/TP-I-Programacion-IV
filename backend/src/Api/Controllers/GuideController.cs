using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Guide;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/guide")]
    public class GuideController : ControllerBase
    {
        private readonly IGuideRepository _guideRepo;

        public GuideController(IGuideRepository guideRepo)
        {
            _guideRepo = guideRepo;
        }

        [HttpPost]
        public IActionResult Create([FromBody]CreateGuideRequest guideDto)
        {
            var guide = new Guide
            {
                Title = guideDto.Title,
                Description = guideDto.Description,
                Content = guideDto.Content,
                Difficulty = guideDto.Difficulty,
                Image = guideDto.Image,
                Tags = guideDto.Tags,
                AuthorId = guideDto.AuthorId
            };

            _guideRepo.Create(guide);

            return CreatedAtAction(nameof(GetById), new { id = guide.Id }, guide);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var guides = _guideRepo.GetAll();
            return Ok(guides);
        }

        // Se puede hacer de las 2 formas
        // [HttpGet("{id}")]
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById([FromRoute] int id)

        {
            var guide = _guideRepo.GetById(id);

            if (guide == null)
            {
                return NotFound("Guide not found");
            }

            return Ok(guide);
        }

        // TODO: hacer los que faltan
    }
}