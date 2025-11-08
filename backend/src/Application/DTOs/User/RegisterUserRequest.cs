using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.Users
{
    public record RegisterUserRequest
    (
        [EmailAddress]
        string Email,
        [Required]
        string Username,
        [Required]
        string Password
    );
}