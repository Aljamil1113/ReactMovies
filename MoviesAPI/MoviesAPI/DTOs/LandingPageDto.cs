namespace MoviesAPI.DTOs
{
    public class LandingPageDto
    {
        public List<MovieDto> InTheaters { get; set; }
        public List<MovieDto> UpcomingReleases { get; set; }
    }
}
