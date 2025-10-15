using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Score
{
    public record UpdateScoreRequest
    (
        [Required]
        string Comment
    );
}