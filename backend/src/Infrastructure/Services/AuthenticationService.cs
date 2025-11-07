using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using Infrastructure.Configuration;
using Domain.Interfaces;
using Domain.Entities;

namespace Application.Services
{
    public class AuthenticationService
    {
        private readonly AuthenticationSettings _options;
        private readonly IUserRepository _userRepo;

        public AuthenticationService(IOptions<AuthenticationSettings> options, IUserRepository userRepo)
        {
            _options = options?.Value ?? throw new ArgumentNullException(nameof(options));
            _userRepo = userRepo;
        }

        private User? ValidateUser(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = _userRepo.GetByEmail(email);
            if (user == null)
                return null;

            if (VerifyPassword(password, user.PasswordHash))
                return user;

            return null;
        }

        public string Authenticate(string email, string password)
        {
            var user = ValidateUser(email, password);
            if (user == null)
                throw new UnauthorizedAccessException("Usuario o contraseña incorrectos.");

            // Crear el token JWT
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_options.SecretForKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim("sub", user.Id.ToString()),
                new Claim("email", user.Email),
                new Claim("role", user.Role.ToString())
            };

            var token = new JwtSecurityToken(
                _options.Issuer,
                _options.Audience,
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.AddHours(1),
                creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public User Register(string email, string password, string username)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentNullException(nameof(email));

            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentNullException(nameof(password));

            var hashedPassword = HashPassword(password);

            var newUser = new User
            {
                Email = email,
                PasswordHash = hashedPassword,
                Username = username
            };

            var createdUser = _userRepo.Create(newUser);

            return createdUser;
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

        private static bool VerifyPassword(string password, string storedHash)
        {
            var parts = storedHash.Split(':');
            if (parts.Length != 3) return false;

            if (!int.TryParse(parts[0], out int iterations)) return false;

            byte[] salt;
            try
            {
                salt = Convert.FromBase64String(parts[1]);
            }
            catch
            {
                return false;
            }

            byte[] storedHashBytes;
            try
            {
                storedHashBytes = Convert.FromBase64String(parts[2]);
            }
            catch
            {
                return false;
            }

            using (var pbkdf2 = new System.Security.Cryptography.Rfc2898DeriveBytes(password, salt, iterations, System.Security.Cryptography.HashAlgorithmName.SHA256))
            {
                var computedHash = pbkdf2.GetBytes(storedHashBytes.Length);
                return computedHash.SequenceEqual(storedHashBytes);
            }
        }
    }
}