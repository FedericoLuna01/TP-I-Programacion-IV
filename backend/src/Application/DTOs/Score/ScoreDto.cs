using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.DTOs.Score
{
  public record ScoreDto(int Id, int ScoreValue, string Comment, int UserId, int GuideId)
  {
    public static ScoreDto Create(Domain.Entities.Score entity)
    {
      var dto = new ScoreDto(entity.Id, entity.ScoreValue, entity.Comment, entity.UserId, entity.GuideId);

      return dto;
    }

    public static List<ScoreDto> Create(IEnumerable<Domain.Entities.Score> entities)
    {
      List<ScoreDto> dtoList = [];

      foreach (var entity in entities)
      {
        dtoList.Add(ScoreDto.Create(entity));
      }

      return dtoList;
    }
  }
}