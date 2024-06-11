using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.INFARSTRUTURE.Constant;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.ShowModel;
using Movie.INFARSTRUTURE.Models.ShowSeat;
using Movie.SERVICES.Interfaces.IRepositories;
using MovieApi.Extensions;
using MovieApi.Helpers;
using System.ComponentModel.DataAnnotations;
using System.Net.WebSockets;
namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowController : ControllerBase
    {
        private IMapper _mapper;
        private IShowRepository _showRepository;
        private ISeatRepository _seatRepository;
        private IShowSeatRepository _showSeatRepository;
        public ShowController(IShowRepository showRepository, IMapper mapper, ISeatRepository seatRepository, IShowSeatRepository showSeatRepository)
        {
            _mapper = mapper;
            _showRepository = showRepository;
            _seatRepository = seatRepository;
            _showSeatRepository = showSeatRepository;
        }
        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetInfoShow(int id)
        {
            var show = await _showRepository.GetInfoShow(id);
            if (show == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No showtime in database");
            }

            var result = new Response<ShowInfoResult>
            {
                Data = _mapper.Map<ShowInfoResult>(show),
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get showtime success"
            };
            return Ok(result);
        }
        [Route("Shows")]
        [HttpGet]
        public async Task<IActionResult> GetShowList([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filter = "",  [FromQuery] int movieID = 0)
        {
            var showList = await _showRepository.GetListShow(page, pageSize, filter, movieID);
            if (showList == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No show in database");
            }
            return StatusCode(StatusCodes.Status200OK, showList);
        }
        [Route("GetListShowByMovie")]
        [HttpPost]
        public async Task<IActionResult> GetListShowByMovie(ShowByMovieVm showVm)
        {
            var shows = await _showRepository.GetListShowByMovie(showVm);
            var result = new Response<IEnumerable<ShowResultByMovieVm>>
            {
                Data = _mapper.Map<IEnumerable<ShowResultByMovieVm>>(shows),
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get listshow success"
            };
            return Ok(result);
        }
        [Route("GetListMovieByCinema")]
        [HttpPost]
        public async Task<IActionResult> GetListMovieByCinema(ShowByCinemaVm showVm)
        {
            var movieShow = await _showRepository.GetListMovieByCinema(showVm.CinemaID,showVm.ShowDate);
            var result = new Response<IEnumerable<ShowByCinemaResult>>
            {
                Data = movieShow,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get listmovie by cinema success"
            };
            return Ok(result);
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("DeleteShow")]
        [HttpDelete]
        public async Task<IActionResult> DeleteShow(int id)
        {
            var show = await _showRepository.GetByIdAsync(id);
            if (show == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No show found to delete"
                });
            }
            var showseats = await _showSeatRepository.GetListShowSeatByShowId(show.ShowID);
            await _showSeatRepository.DeleteListAsync(showseats);
            await _showRepository.DeleteAsync(show);
            await _showRepository.SaveChangesAsync();
            return Ok(new Response { Status = Status.Success, Message = "Delete show success", Code = StatusCodes.Status200OK });

        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("CreateShow")]
        [HttpPost]
        public async Task<IActionResult> CreateShow(ShowViewModel showVm)
        {
            try
            {
                var show = _mapper.Map<Movie.INFARSTRUTURE.Entities.Show>(showVm);
                await _showRepository.CreateAsync(show);
                await _showRepository.SaveChangesAsync();
                var listSeat = await _seatRepository.GetListSeatByTheater(show.TheaterID);
                foreach (var seat in listSeat)
                {
                    int price = 0;
                    if (seat.SeatType == ApplicationConstant.STATUS_SEAT_NORMAL)
                    {
                        price = ApplicationConstant.PRICE_NORMAL;
                    }
                    if (seat.SeatType == ApplicationConstant.STATUS_SEAT_VIP)
                    {
                        price = ApplicationConstant.PRICE_VIP;

                    }
                    var showSeat = new ShowSeatVm
                    {
                        ShowID = show.ShowID,
                        SeatID = seat.SeatID,
                        SeatStatus = 1,
                        Price = price
                    };
                    var showSeatAdd = _mapper.Map<ShowSeat>(showSeat);
                    await _showSeatRepository.CreateAsync(showSeatAdd);
                }
                await _showSeatRepository.SaveChangesAsync();
                var resultData = _mapper.Map<ShowResultVm>(show);
                var result = new Response<ShowResultVm>
                {
                    Data = resultData,
                    Code = StatusCodes.Status200OK,
                    Status = Status.Success,
                    Message = "Create show success"
                };
                return Ok(result);
            }
            catch (Exception ex) 
            {
                
                return Ok();
            }
          
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateShow([Required] int id, ShowUpdateModel showVm)
        {
            var show = await _showRepository.GetByIdAsync(id);
            if (show == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No show found to update"
                });
            }
            var showUpdate = _mapper.Map(showVm, show);
            await _showRepository.UpdateAsync(showUpdate);
            var result = new Response
            {
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Update show success"
            };
            return Ok(result);
        }
    }
}
