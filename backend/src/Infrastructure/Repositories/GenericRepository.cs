using System.Collections.Generic;
using System.Linq;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public virtual T Create(T entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public virtual T? Delete(object id)
        {
            var entity = _dbSet.Find(id);
            if (entity == null) return null;

            _dbSet.Remove(entity);
            _context.SaveChanges();
            return entity;
        }

        public virtual List<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public virtual T? GetById(object id)
        {
            return _dbSet.Find(id);
        }

        public virtual T? Update(object id, T entity)
        {
            var existing = _dbSet.Find(id);
            if (existing == null) return null;

            var entityType = _context.Model.FindEntityType(typeof(T));
            var keyProperty = entityType.FindPrimaryKey()?.Properties.FirstOrDefault();
            var keyName = keyProperty?.Name;

            foreach (var property in entityType.GetProperties())
            {
                if (property.Name != keyName)
                {
                    var value = _context.Entry(entity).Property(property.Name).CurrentValue;
                    _context.Entry(existing).Property(property.Name).CurrentValue = value;
                }
            }

            _context.SaveChanges();
            return existing;
        }
    }
}
