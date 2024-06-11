using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.INFARSTRUTURE.Constant;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.SeatModel;
using Movie.SERVICES.Interfaces.IRepositories;
using MovieApi.Extensions;
using MovieApi.Helpers;
using Newtonsoft.Json;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private IMapper _mapper;
        private ISeatRepository _seatRepository;
        public SeatController(ISeatRepository seatRepository, IMapper mapper)
        {
            _mapper = mapper;
            _seatRepository = seatRepository;
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("CreateListSeat")]
        [HttpPost]
        public async Task<IActionResult> InsertListSeat(SeatInsertVm seatVm)
        {
            var seats = await _seatRepository.GetListSeatByTheater(seatVm.theaterID);
            if (seats.Count()!= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)ErrorCode.Error106, Message = "Seat already exist" });
            }
            var result = await _seatRepository.InsertListSeat(seatVm.qtySeat, seatVm.theaterID);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Insert not success!");
            }
            return Ok(new Response { Status = Status.Success, Message = "Insert listSeat success", Code = StatusCodes.Status200OK });
        }
        [Route("ListSeatByTheater")]
        [HttpGet]
        public async Task<IActionResult> GetListSeatByTheater(int theaterID)
        {
            var listSeat = await _seatRepository.GetListSeatByTheater(theaterID);
            var result = new Response<IEnumerable<SeatResultVm>>
            {
                Data = _mapper.Map<IEnumerable<SeatResultVm>>(listSeat),
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get listSeat success"
            };
            return Ok(result);
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("UpdateSeat/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateSeat(int id, SeatViewModel seatVm)
        {
            var seat = await _seatRepository.GetByIdAsync(id);
            if (seat == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No seat found to delete"
                });
            }
            var seatUpdate = _mapper.Map(seatVm, seat);
            await _seatRepository.UpdateAsync(seatUpdate);
            var result = new Response
            {
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Update seat success"
            };
            return Ok(result);
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("UpdateSeats")]
        [HttpPut]
        public async Task<IActionResult> UpdateSeats([FromForm] string datajson)
        {
            var seats = JsonConvert.DeserializeObject<List<Movie.INFARSTRUTURE.Entities.Seat>>(datajson).ToArray();
            for (int i = 0; i < seats.Length; i++)
            {
                var seat = await _seatRepository.GetByIdAsync(seats[i].SeatID);
                seat.SeatName = seats[i].SeatName;
                seat.SeatType = seats[i].SeatType;
                await _seatRepository.UpdateAsync(seat);
            }
            var result = new Response
            {
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Update seats success"
            };
            return Ok(result);
        }
    }
}
