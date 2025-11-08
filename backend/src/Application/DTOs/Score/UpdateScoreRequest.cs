using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Dtos.Score
{
    public record UpdateScoreRequest
    (
        [Required]
        int ScoreValue,
        [Required]
        string Comment
    );
}