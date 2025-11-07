namespace Application.DTOs.FreeToGame
{
    public class FreeToGameGameDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Thumbnail { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string GameUrl { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public string Platform { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public string Developer { get; set; } = string.Empty;
        public string ReleaseDate { get; set; } = string.Empty;
        public string FreeToGameProfileUrl { get; set; } = string.Empty;
        public MinimumSystemRequirementsDto? MinimumSystemRequirements { get; set; }
        public List<ScreenshotDto> Screenshots { get; set; } = new();
    }

    public class MinimumSystemRequirementsDto
    {
        public string Os { get; set; } = string.Empty;
        public string Processor { get; set; } = string.Empty;
        public string Memory { get; set; } = string.Empty;
        public string Graphics { get; set; } = string.Empty;
        public string Storage { get; set; } = string.Empty;
    }

    public class ScreenshotDto
    {
        public int Id { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
