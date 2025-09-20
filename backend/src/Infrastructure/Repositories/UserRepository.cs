using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }

        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public bool Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public IEnumerable<User> GetAll()
        {
            var users = _context.Users.ToList();
            return users;
        }

        public User? GetById(int id)
        {
            var user = _context.Users.Find(id);
            return user;
        }

        public User? Update(int id, User updateUser)
        {
            var user = _context.Users.Find(id);

            if (user == null) return null;

            user.Avatar = updateUser.Avatar;
            user.Banner = updateUser.Banner;
            user.UpdatedAt = DateTime.UtcNow;
            user.Role = updateUser.Role;
            user.Username = updateUser.Username;

            _context.SaveChanges();

            return user;
        }
    }
}