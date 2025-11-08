using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Application.Services;
using Microsoft.AspNetCore.Mvc;
using Application.DTOs.Score;
using Application.Dtos.Score;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/score")]
    public class ScoreController : ControllerBase
    {
        private readonly ScoreService _scoreService;

        public ScoreController(ScoreService scoreService)
        {
            _scoreService = scoreService;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create([FromBody] CreateScoreRequest scoreDto)
        {
            var score = _scoreService.Create(
                scoreDto.ScoreValue,
                scoreDto.Comment,
                scoreDto.UserId,
                scoreDto.GuideId
            );

            return CreatedAtAction(nameof(GetById), new { id = score.Id }, score);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<ScoreDto> GetById([FromRoute] int id)
        {
            var score = _scoreService.GetById(id);

            return score;
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public ActionResult<ScoreDto> Update([FromRoute] int id, [FromBody] UpdateScoreRequest scoreDto)
        {
            var updateScore = _scoreService.Update(
                id,
                scoreDto.ScoreValue,
                scoreDto.Comment
            );

            return updateScore;
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public IActionResult Delete([FromRoute] int id)
        {
            _scoreService.Delete(id);

            return NoContent();
        }

    }
}