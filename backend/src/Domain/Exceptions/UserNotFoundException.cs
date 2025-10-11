using System;

namespace Domain.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException()
            : base("Usuario no encontrado")
        {

        }

        public UserNotFoundException(string message)
            : base(message)
        {
        }

        public UserNotFoundException(int userId)
            : base($"Usuario con ID {userId} no encontrado")
        {
        }

        public UserNotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}