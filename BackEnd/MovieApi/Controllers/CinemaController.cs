using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Protocol;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.MovieModel;
using Movie.SERVICES.Interfaces.IRepositories;
using Movie.SERVICES.Repositories;
using MovieApi.Extensions;
using MovieApi.Helpers;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CinemaController : ControllerBase
    {
        private IMapper _mapper;
        private ICinemaRepository _cinemaRepository;
        public CinemaController(ICinemaRepository cinamaRepository, IMapper mapper)
        {
            _mapper = mapper;
            _cinemaRepository = cinamaRepository;
        }
        [Route("Cinemas")]
        [HttpGet]
        public async Task<IActionResult> GetListCinema([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filter = "", [FromQuery] int city = 0)
        {
            var movieList = await _cinemaRepository.GetListCinema(page, pageSize, filter, city);
            if (movieList == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No movie in database");
            }
            return StatusCode(StatusCodes.Status200OK, movieList);
        }
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetInfoCinema(int id)
        {
            var cinema = await _cinemaRepository.GetByIdAsync(id);
            if (cinema == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No cinema in database");
            }

            var result = new Response<CinemaResultVm>
            {
                Data = _mapper.Map<CinemaResultVm>(cinema),
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get cinema success"
            };
            return Ok(result);
        }
        [Route("CinemabyCity")]
        [HttpGet]
        public async Task<IActionResult> GetListCinemaByCity([FromQuery] int cityID)
        {
            var listCinema = await _cinemaRepository.GetListCinemaByCity(cityID);
            if (listCinema == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No cinema in database");
            }
            var result = new Response<IEnumerable<CinemaResultVmByCity>>
            {
                Data = listCinema,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get cinema success"
            };

            return Ok(result);
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("DeleteCinema")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCinema(int id)
        {
            var cinema = await _cinemaRepository.GetByIdAsync(id);
            if (cinema == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No movie found to delete"
                });
            }
            await _cinemaRepository.DeleteAsync(cinema);
            await _cinemaRepository.SaveChangesAsync();
            return Ok(new Response { Status = Status.Success, Message = "Delete cinema success", Code = StatusCodes.Status200OK });

        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("CreateCinema")]
        [HttpPost]
        public async Task<IActionResult> CreateCinema(CinemaViewModel cinemaVM)
        {
            var cinema = _mapper.Map<Movie.INFARSTRUTURE.Entities.Cinema>(cinemaVM);
            await _cinemaRepository.CreateAsync(cinema);
            await _cinemaRepository.SaveChangesAsync();
            var resultData = _mapper.Map<CinemaResultVm>(cinema);
            var result = new Response<CinemaResultVm>
            {
                Data = resultData,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get cinema success"
            };
            return Ok(result);
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateCinema([Required] int id, CinemaViewModel cinemaVM)
        {
            var cinema = await _cinemaRepository.GetByIdAsync(id);
            if (cinema == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No movie found to update"
                });
            }
            var cinemaData = _mapper.Map(cinemaVM, cinema);
            await _cinemaRepository.UpdateAsync(cinemaData);
            var result = new Response
            {
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Update cinema success"
            };
            return Ok(result);
        }
    }
}
