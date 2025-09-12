using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Score
    {
        public int Id { get; set; }
        public int ScoreValue { get; set; }
        public string Comment { get; set; } = string.Empty;

        // Relations
        public int UserId { get; set; }
        public User User { get; set; } = new User();
        public int GuideId { get; set; }
        public Guide? Guide { get; set; }

        private Score()
        {

        }
    }
}