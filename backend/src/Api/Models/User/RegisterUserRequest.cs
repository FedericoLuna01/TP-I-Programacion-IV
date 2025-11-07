using System.ComponentModel.DataAnnotations;

namespace Api.Models.Users
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