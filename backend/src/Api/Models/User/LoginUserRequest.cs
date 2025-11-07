using System.ComponentModel.DataAnnotations;

namespace Api.Models.Users
{
    public record LoginUserRequest
    (
        [EmailAddress]
        string Email,
        [Required]
        string Password
    );
}