using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using MoviesAPI.Helpers;
using MoviesAPI.Services;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class GenresController : ControllerBase
    {
        private readonly IRepository repository;
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GenresController(IRepository repository, ILogger<GenresController> logger, ApplicationDbContext context,
            IMapper mapper)
        {
            this.repository = repository;
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<GenreDto>>> GetGenres([FromQuery] PaginationDto paginationDto)
        {
            var queryable = context.Genres.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var genres = await queryable.OrderBy(x => x.Name).Paginate(paginationDto).ToListAsync();

            return  mapper.Map<List<GenreDto>>(genres);       
        }

        [HttpGet("all")] //api/genres
        [AllowAnonymous]
        public async Task<ActionResult<List<GenreDto>>> All()
        {         
            var genres = await context.Genres.OrderBy(x => x.Name).ToListAsync();
            return mapper.Map<List<GenreDto>>(genres);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GenreDto>> GetGenreById(int id)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == id);

            if(genre == null)
            {
                logger.LogWarning($"Genre with Id {id} no found");
                return NotFound();
            }
            return mapper.Map<GenreDto>(genre);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDto genreCreationDto)
        {
            var genre = mapper.Map<Genre>(genreCreationDto);
            context.Add(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] GenreCreationDto genreCreationDto)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == id);

            if(genre == null)
            {
                return NotFound();
            }
            genre = mapper.Map(genreCreationDto, genre);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exists = await context.Genres.AnyAsync(x => x.Id == id);

            if(!exists)
            {
                return NotFound();
            }
            context.Genres.Remove(new Genre() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
