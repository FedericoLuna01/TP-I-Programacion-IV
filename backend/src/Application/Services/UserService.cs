using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Application.Dtos.Users;
using Domain.Entities;
using Domain.Enums;
using Domain.Exceptions;
using Domain.Interfaces;

namespace Application.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public UserDto Create(string email, UserRole role, string username, string password)
        {
            var hashedPassword = HashPassword(password);

            var user = new User
            {
                Email = email,
                Role = role,
                Username = username,
                PasswordHash = hashedPassword
            };
            _userRepo.Create(user);
            return UserDto.Create(user);
        }

        public IEnumerable<UserDto> GetAll()
        {
            var users = _userRepo.GetAll();
            return UserDto.Create(users);
        }

        public void Delete(int id)
        {
            _userRepo.Delete(id);
        }

        public UserDto GetById(int id)
        {
            var user = _userRepo.GetById(id) ?? throw new UserNotFoundException();

            return UserDto.Create(user);
        }

        public UserDto Update(int id, string avatar, string banner, UserRole role, string username)
        {
            var existingUser = _userRepo.GetById(id) ?? throw new UserNotFoundException();

            existingUser.Avatar = avatar;
            existingUser.Banner = banner;
            existingUser.Role = role;
            existingUser.Username = username;

            var updatedUser = _userRepo.Update(id, existingUser) ?? throw new UserNotFoundException();

            return UserDto.Create(updatedUser);
        }

        private static string HashPassword(string password)
        {
            // PBKDF2 con salt aleatorio
            const int saltSize = 16; // 128 bit
            const int iterations = 10000;
            const int hashSize = 32; // 256 bit

            var salt = new byte[saltSize];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            using (var pbkdf2 = new System.Security.Cryptography.Rfc2898DeriveBytes(password, salt, iterations, System.Security.Cryptography.HashAlgorithmName.SHA256))
            {
                var hash = pbkdf2.GetBytes(hashSize);
                // Guardar como: iteraciones:saltBase64:hashBase64
                return $"{iterations}:{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
            }
        }
    }
}
