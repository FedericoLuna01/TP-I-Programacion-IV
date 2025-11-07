using System;

namespace Domain.Exceptions
{
  public class InvalidCredentialsException : Exception
  {
    public InvalidCredentialsException()
        : base("Credenciales inválidas")
    {
    }

    public InvalidCredentialsException(string message)
        : base(message)
    {
    }

    public InvalidCredentialsException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
  }
}
