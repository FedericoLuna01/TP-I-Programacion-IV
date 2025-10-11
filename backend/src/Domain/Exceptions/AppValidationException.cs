using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class AppValidationException : Exception
    {
        public string ErrorCode { get; private set; }
        public AppValidationException()
        : base()
        {
        }

        public AppValidationException(string message, string errorCode = "")
            : base(message)
        {
            ErrorCode = errorCode;
        }

        public AppValidationException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}