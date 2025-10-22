using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enums;
using Domain.Exceptions;
using Domain.Interfaces;

namespace Domain.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public User Create(string email, UserRole role, string username, string password)
        {
            var user = new User
            {
                Email = email,
                Role = role,
                Username = username,
                PasswordHash = password
            };
            _userRepo.Create(user);
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _userRepo.GetAll();
        }

        public void Delete(int id)
        {
            _userRepo.Delete(id);
        }

        public User GetById(int id)
        {
            var user = _userRepo.GetById(id) ?? throw new UserNotFoundException();

            return user;
        }

        public User Update(int id, string avatar, string banner, UserRole role, string username)
        {
            var updateUser = new User
            {
                Avatar = avatar,
                Banner = banner,
                Role = role,
                Username = username
            };
            var updatedUser = _userRepo.Update(id, updateUser) ?? throw new UserNotFoundException();
            return updatedUser;
        }

    }
}