using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Game
{
    public record CreateGameRequest
    (
        [Required]
        string Name,
        [Required]
        string Description,
        [Required]
        string Category,
        [Required]
        string Image,
        [Required]
        int UserId
    );
}