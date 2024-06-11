using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.INFARSTRUTURE.Models.TheaterModel;
using Movie.SERVICES.Interfaces.IRepositories;
using MovieApi.Extensions;
using MovieApi.Helpers;
using System.ComponentModel.DataAnnotations;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheaterController : ControllerBase
    {
        private IMapper _mapper;
        private ITheaterRepository _theaterRepository;
        public TheaterController(ITheaterRepository theaterRepository, IMapper mapper)
        {
            _mapper = mapper;
            _theaterRepository = theaterRepository;
        }

        [Route("ListTheater")]
        [HttpGet]
        public async Task<IActionResult> GetListTheater([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filter = "")
        {
            var listTheater = await _theaterRepository.GetListTheater(page, pageSize, filter);
            if (listTheater == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No đata");
            }
            return StatusCode(StatusCodes.Status200OK, listTheater);
        }

        [Route("TheatersByCinema")]
        [HttpGet]
        public async Task<IActionResult> TheatersByCinema([FromQuery] int cinemaID = 0)
        {
            var listTheater = await _theaterRepository.TheatersByCinema(cinemaID);
            if (listTheater == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No theater in database");
            }
            return StatusCode(StatusCodes.Status200OK, listTheater);
        }


        [Route("TheaterInfo/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetInfoTheater(int id)
        {
            var theater = await _theaterRepository.GetByIdAsync(id);
            if (theater == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No theater in database");
            }

            var result = new Response<TheaterResultVm>
            {
                Data = _mapper.Map<TheaterResultVm>(theater),
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get theater success"
            };
            return Ok(result);
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("DeleteTheater/{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteTheater(int id)
        {
            var theater = await _theaterRepository.GetByIdAsync(id);
            if (theater == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No theater found to delete"
                });
            }
            await _theaterRepository.DeleteAsync(theater);
            await _theaterRepository.SaveChangesAsync();
            return Ok(new Response { Status = Status.Success, Message = "Delete theater success", Code = StatusCodes.Status200OK });

        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("CreateTheater")]
        [HttpPost]
        public async Task<IActionResult> CreateTheater(TheaterViewModel theaterVm)
        {
            var theater = _mapper.Map<Movie.INFARSTRUTURE.Entities.Theater>(theaterVm);
            await _theaterRepository.CreateAsync(theater);
            await _theaterRepository.SaveChangesAsync();
            var resultData = _mapper.Map<TheaterResultVm>(theater);
            var result = new Response<TheaterResultVm>
            {
                Data = resultData,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Create theater success"
            };
            return Ok(result);
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("UpdateTheater/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateTheater([Required] int id, TheaterViewModel theaterVm)
        {
            var theater = await _theaterRepository.GetByIdAsync(id);
            if (theater == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No theater found to delete"
                });
            }
            var theaterUpdate = _mapper.Map(theaterVm, theater);
            await _theaterRepository.UpdateAsync(theaterUpdate);
            var result = new Response
            {
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Update theater success"
            };
            return Ok(result);
        }
    }
}
