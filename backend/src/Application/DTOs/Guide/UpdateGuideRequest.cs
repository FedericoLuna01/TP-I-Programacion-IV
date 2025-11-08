using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Application.Dtos.Guide
{
    public record UpdateGuideRequest
    (
        [Required]
        string Title,
        [Required]
        string Description,
        [Required]
        string Content,
        [Required]
        DifficultyLevel Difficulty,
        [Required]
        string Image,
        [Required]
        List<string> Tags
    );


}