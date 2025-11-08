using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Dtos.Score
{
    public record CreateScoreRequest
    (
        [Required]
        int ScoreValue,
        [Required]
        string Comment,
        [Required]
        int UserId,
        [Required]
        int GuideId
    );
}
