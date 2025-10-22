using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Guide;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/guide")]
    public class GuideController : ControllerBase
    {
        private readonly GuideService _guideService;

        public GuideController(GuideService guideService)
        {
            _guideService = guideService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateGuideRequest guideDto)
        {
            var guide = _guideService.Create(guideDto.Title,
                guideDto.Content,
                guideDto.Description,
                guideDto.Difficulty,
                guideDto.Image,
                guideDto.Tags,
                guideDto.AuthorId,
                guideDto.GameId
            );
            return CreatedAtAction(nameof(GetById), new { id = guide.Id }, guide);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Guide>> GetAll()
        {
            var guides = _guideService.GetAll();
            return Ok(guides);
        }
        [HttpGet]
        [Route("{id}")]
        public ActionResult<Guide> GetById([FromRoute] int id)

        {
            var guide = _guideService.GetById(id);

            return guide;
        }

        // TODO: hacer los que faltan
    }
}