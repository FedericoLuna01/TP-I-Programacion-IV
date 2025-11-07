using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        User? Validate(string email, string password);
        User? GetByEmail(string email);
    }
}
