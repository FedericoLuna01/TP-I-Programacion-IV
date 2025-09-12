using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : BaseUser
    {
        public string TotalRating { get; set; } = "0.0";
        public int Followers { get; set; } = 0;

        // Relations
        public List<Guide> Guides { get; set; } = new List<Guide>();
        public List<Comment> Comments { get; set; } = new List<Comment>();

        public List<Game> Games { get; set; } = new List<Game>();

        public List<Score> Scores { get; set; } = new List<Score>();
    }

}