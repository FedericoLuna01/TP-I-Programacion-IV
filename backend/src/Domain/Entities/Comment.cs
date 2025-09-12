using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentText { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        // Relations  
        public int GuideId { get; set; }
        public Guide Guide { get; set; } = new Guide();
        public int UserId { get; set; }
        public User User { get; set; } = new User();
    }
}