using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        [EmailAddress(ErrorMessage = "Email invalido")]
        public string Email { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Banner { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public int Followers { get; set; } = 0;
        public UserRole Role { get; set; } = UserRole.User;

        // Relations
        public List<Guide>? Guides { get; set; }
        public List<Comment>? Comments { get; set; }

        public List<Game>? Games { get; set; }

        public List<Score>? Scores { get; set; }
    }
}
