using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using MoviesAPI.Services;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IRepository repository;
        private readonly ILogger<GenresController> logger;

        public GenresController(IRepository repository, ILogger<GenresController> logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

        [HttpGet]
        [ResponseCache(Duration = 60)]
        public async Task<ActionResult<List<Genre>>> Get()
        {
            logger.LogInformation("Getting all the genres");

            return await repository.GetAllGenres();
        }

        [HttpGet("{id}")]
        public ActionResult<Genre> Get(int id, [BindRequired]string param)
        {
            logger.LogDebug("Get Genre by Id executing...");
            var genre = repository.GetGenre(id);

            if(genre == null)
            {
                logger.LogWarning($"Genre with Id {id} no found");
                return NotFound();
            }
            return genre;
        }

        [HttpPost]
        public ActionResult Post([FromBody] Genre genre)
        {
            repository.AddGenre(genre);

            return NoContent();
        }

        [HttpPut]
        public ActionResult Put([FromBody] Genre genre)
        {
            

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return NoContent();
        }
    }
}
