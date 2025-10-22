using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models.Guide;
using Api.Models.Score;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

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
        public ActionResult<Score> GetById([FromRoute] int id)
        {
            var score = _scoreService.GetById(id);

            return score;
        }



        // [HttpPut]
        // public IActionResult Update([FromBody] UpdateScoreRequest scoreDto)



        // [HttpGet]
        // public ActionResult<IEnumerable<Guide>> GetAll()
        // {
            
        // }

        // TODO: hacer los que faltan
    }
}