using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Guide;
using Api.Models.Score;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/guide")]
    [Authorize]
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

        [HttpPut]
        [Route("{id}")]
        public ActionResult<Guide> Update([FromRoute] int id, [FromBody] UpdateGuideRequest updateDto)
        {
            var updateGuide = _guideService.Update(id, updateDto.Title, updateDto.Description, updateDto.Content, updateDto.Difficulty, updateDto.Image, updateDto.Tags);
            return updateGuide;
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            _guideService.Delete(id);
            return NoContent();
        }

    }
}