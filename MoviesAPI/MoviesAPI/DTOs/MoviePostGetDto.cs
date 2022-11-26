namespace MoviesAPI.DTOs
{
    public class MoviePostGetDTO
    {
        public List<GenreDto> Genres { get; set; }
        public List<MovieTheaterDTO> MovieTheaters { get; set; }
    }
}
