using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Guide;
using Application.Dtos.Guide;

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
        [Authorize]
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
        public ActionResult<IEnumerable<GuideDto>> GetAll()
        {
            var guides = _guideService.GetAll();
            return Ok(guides);
        }
        [HttpGet]
        [Route("{id}")]
        public ActionResult<GuideDto> GetById([FromRoute] int id)

        {
            var guide = _guideService.GetById(id);

            return guide;
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public ActionResult<GuideDto> Update([FromRoute] int id, [FromBody] UpdateGuideRequest updateDto)
        {
            var updateGuide = _guideService.Update(id, updateDto.Title, updateDto.Description, updateDto.Content, updateDto.Difficulty, updateDto.Image, updateDto.Tags);
            return updateGuide;
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public IActionResult Delete([FromRoute] int id)
        {
            _guideService.Delete(id);
            return NoContent();
        }

    }
}