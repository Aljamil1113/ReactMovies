namespace MoviesAPI.DTOs
{
    public class MoviePutGetDTO
    {
        public MovieDto Movie { get; set; }
        public List<GenreDto> SelectedGenres { get; set; }
        public List<GenreDto> NonSelectedGenres { get; set; }
        public List<MovieTheaterDTO> SelectedMovieTheaters { get; set; }
        public List<MovieTheaterDTO> NonSelectedMovieTheaters { get; set; }
        public List<ActorsMovieDTO> Actors { get; set; }
    }
}
