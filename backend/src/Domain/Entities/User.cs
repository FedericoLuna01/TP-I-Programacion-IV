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
    
    }
}