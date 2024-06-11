using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.ReportModel;
using Movie.SERVICES.Interfaces.IRepositories;
using MovieApi.Extensions;
using MovieApi.Helpers;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private IMapper _mapper;
        private IReportRepository _reportRepository;
        public ReportController(IReportRepository reportRepository, IMapper mapper)
        {
            _mapper = mapper;
            _reportRepository = reportRepository;
        }
        [Route("RevenueByDayOfMonth")]
        [HttpPost]
        public async Task<IActionResult> GetRevenueByDayOfMonth(RevenueByDayOfMonthVm revenueVm)
        {
            var revenue = await _reportRepository.GetRevenueByDayOfMonth(revenueVm.Year, revenueVm.Month);
            if (revenue == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No revenue in database");
            }

            var result = new Response<IEnumerable<RevenueByDayOfMonthResultVm>>
            {
                Data = revenue,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get revenue success"
            };
            return Ok(result);
        }
        [Route("TopMovieByRevenue")]
        [HttpGet]
        public async Task<IActionResult> GetTopMovieByRevenue()
        {
            var topMovie = await _reportRepository.GetTopMovieByRevenue();
            if (topMovie == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No revenue in database");
            }

            var result = new Response<IEnumerable<TopMoviesByRevenue>>
            {
                Data = topMovie,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get revenue success"
            };
            return Ok(result);
        }

    }
}
