using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Guide
{
    public record UpdateGameRequest
    (
        [Required]
        string Name,
        [Required]
        string Description,
        [Required]
        string Category,
        [Required]
        string Image
    );
}