namespace Application.DTOs.Game
{
    public record GameDto(int Id, string Name, string Description, string Category, string Image, int UserId)
    {
        public static GameDto Create(Domain.Entities.Game entity)
        {
            var dto = new GameDto(entity.Id, entity.Name, entity.Description, entity.Category, entity.Image, entity.UserId);

            return dto;
        }

        public static List<GameDto> Create(IEnumerable<Domain.Entities.Game> entities)
        {
            List<GameDto> dtoList = [];

            foreach (var entity in entities)
            {
                dtoList.Add(GameDto.Create(entity));
            }

            return dtoList;
        }
    }
}