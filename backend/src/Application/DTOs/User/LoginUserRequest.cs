using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.Users
{
    public record LoginUserRequest
    (
        [EmailAddress]
        string Email,
        [Required]
        string Password
    );
}