using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IExternalApiService
    {
        Task<T> GetAsync<T>(string endpoint);
        Task<List<T>> GetListAsync<T>(string endpoint);
    }
}
