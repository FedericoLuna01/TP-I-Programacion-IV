using Domain.Enums;

namespace Application.DTOs.Guide
{
  public record GuideDto(int Id, string Title, string Description, string Content, DifficultyLevel Difficulty, string Image, List<string> Tags, DateTime CreatedAt, int AuthorId, int GameId)
  {
    public static GuideDto Create(Domain.Entities.Guide entity)
    {
      var dto = new GuideDto(entity.Id, entity.Title, entity.Description, entity.Content, entity.Difficulty, entity.Image, entity.Tags, entity.CreatedAt, entity.AuthorId, entity.GameId);

      return dto;
    }

    public static List<GuideDto> Create(IEnumerable<Domain.Entities.Guide> entities)
    {
      List<GuideDto> dtoList = [];

      foreach (var entity in entities)
      {
        dtoList.Add(GuideDto.Create(entity));
      }

      return dtoList;
    }
  }
}