using System.Collections.Generic;

namespace Domain.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        T Create(T entity);
        T? Delete(object id);
        List<T> GetAll();
        T? GetById(object id);
        T? Update(object id, T entity);
    }
}
