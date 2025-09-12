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
    }
}