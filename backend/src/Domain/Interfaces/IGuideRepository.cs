using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IGuideRepository
    {
        Guide Create(Guide guide);
        List<Guide> GetAll();
        Guide? GetById(int id);
        Guide Update(int id, Guide guide);
        Guide Delete(int id);
    }
}