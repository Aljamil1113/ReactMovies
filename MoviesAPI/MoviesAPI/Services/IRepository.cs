using MoviesAPI.Entities;

namespace MoviesAPI.Services
{
    public interface IRepository
    {
        void AddGenre(Genre genre);
        Task<List<Genre>> GetAllGenres();
        Genre GetGenre(int Id);
    }
}
