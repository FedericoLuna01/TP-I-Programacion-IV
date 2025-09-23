using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain.Dtos.Guide
{
    public class CreateGuideDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DifficultyLevel Difficulty { get; set; } = DifficultyLevel.Beginner;
        public string Image { get; set; } = string.Empty;
        public List<string> Tags { get; set; } = new List<string>();

        public int AuthorId { get; set; }
    }
}