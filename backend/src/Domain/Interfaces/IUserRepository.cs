using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IUserRepository
    {
        User Create(User user);
        IEnumerable<User> GetAll();
        User? GetById(int id);
        bool Delete(int id);
        User? Update(int id, User updateUser);
        User? Validate(string email, string password);
        User? GetByEmail(string email);
    }
}