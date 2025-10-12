using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain.Entities
{
    public class Guide
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DifficultyLevel Difficulty { get; set; } = DifficultyLevel.Beginner;
        public decimal Rating { get; set; } = 0.0m;
        public string Image { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<string> Tags { get; set; } = new List<string>();

        // Relations
        public int AuthorId { get; set; }
        public User? Author { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Score> Scores { get; set; } = new List<Score>();
        // TODO: Agregar el juego
    }
}