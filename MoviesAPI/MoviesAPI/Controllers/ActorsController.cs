using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly string containerName = "actors";

        public ActorsController(ApplicationDbContext _context, IMapper _mapper, IFileStorageService _fileStorageService)
        {
            context = _context;
            mapper = _mapper;
            fileStorageService = _fileStorageService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDto>>> Get([FromQuery] PaginationDto paginationDto)
        {
            var queryable = context.Actors.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var actors = await queryable.OrderBy(x => x.Name).Paginate(paginationDto).ToArrayAsync();
            return mapper.Map<List<ActorDto>>(actors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActorDto>> Get(int id)
        {
            var actor = await context.Actors.SingleOrDefaultAsync(x => x.Id == id);

            if(actor == null)
            {
                return NotFound();
            }

            return mapper.Map<ActorDto>(actor);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreationDto actorCreationDto)
        {
             var actor = mapper.Map<Actor>(actorCreationDto);

            if(actorCreationDto.Picture != null)
            {
                actor.Picture = await fileStorageService.SaveFile(containerName, actorCreationDto.Picture);
            }

            context.Add(actor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreationDto actorCreationDto)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if(actor == null)
            {
                return NotFound();
            }

            actor = mapper.Map(actorCreationDto, actor);

            if(actorCreationDto.Picture != null)
            {
                actor.Picture = await fileStorageService.EditFile(containerName, actorCreationDto.Picture, actor.Picture);
            }

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await context.Actors.SingleOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            context.Remove(actor);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(actor.Picture, containerName);
            return NoContent();
        }

        [HttpGet("searchByName/{query}")]
        public async Task<ActionResult<List<ActorsMovieDTO>>> SearchByName(string query)
        {
            if(string.IsNullOrEmpty(query)) { return new List<ActorsMovieDTO>(); }

            return await context.Actors.Where(x => x.Name.Contains(query)).OrderBy(x => x.Name)
                .Select(x => new ActorsMovieDTO{ Id = x.Id, Name = x.Name, Picture = x.Picture  }).Take(5).ToListAsync();
        }
    }
}
