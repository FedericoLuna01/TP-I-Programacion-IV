using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Dtos.Game;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IGameRepository
    {
        Game Create(Game createGame);
    }
}