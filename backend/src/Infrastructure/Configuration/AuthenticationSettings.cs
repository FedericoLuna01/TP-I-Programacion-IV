namespace Infrastructure.Configuration
{
  public class AuthenticationSettings
  {
    public string SecretForKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
  }
}