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
        List<Game> GetAll();
        Game? GetById(int id);
        Game? Delete(int id);
        Game? Update(int id, Game updateGame);
    }
}