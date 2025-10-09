using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Api.Models.Guide
{
    public record CreateGuideRequest
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
        List<string> Tags,
        [Required]
        int AuthorId
    );
}