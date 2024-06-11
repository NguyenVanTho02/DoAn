using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using Movie.INFARSTRUTURE.Constant;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.CityModel;
using Movie.INFARSTRUTURE.Models.FeedbackModel;
using Movie.SERVICES.Interfaces.IRepositories;
using Movie.SERVICES.Repositories;
using MovieApi.Extensions;
using MovieApi.Helpers;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private IMapper _mapper;
        private IFeedbackRepository _feedbackRepository;
        private IPaymentRepository _paymentRepository;


        public FeedbackController(IFeedbackRepository feedbackRepository, IPaymentRepository paymentRepository, IMapper mapper)
        {
            _mapper = mapper;
            _feedbackRepository = feedbackRepository;
            _paymentRepository = paymentRepository;
        }
        [Route("CreateFeedback")]
        [HttpPost]
        public async Task<IActionResult> CreateFeedback(FeedbackVm feedbackVm)
        {
            try
            {
                // Kiểm tra xem người dùng đã mua vé cho bộ phim hay chưa
                var userHasPurchasedTicketForMovie = await _paymentRepository.UserHasPurchasedTicketForMovieAsync(feedbackVm.UserID, feedbackVm.MovieID);

                if (!userHasPurchasedTicketForMovie)
                {
                    // Nếu người dùng chưa mua vé cho bộ phim, trả về một response lỗi phù hợp.
                    var errorResponse = new Response
                    {
                        Code = StatusCodes.Status400BadRequest,
                        Status = (int)ErrorCode.Error112,
                        Message = "You must purchase a ticket for this movie before providing feedback."
                    };
                    return BadRequest(errorResponse);
                   
                }

                // Nếu người dùng đã mua vé cho bộ phim, tiếp tục thêm phản hồi.
                var feedback = _mapper.Map<Movie.INFARSTRUTURE.Entities.Feedback>(feedbackVm);
                feedback.DateFeedback = DateTime.Now;
                await _feedbackRepository.CreateAsync(feedback);
                await _feedbackRepository.SaveChangesAsync();

                var result = new Response
                {
                    Code = StatusCodes.Status200OK,
                    Status = Status.Success,
                    Message = "Create feedback success"
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                var errorResponse = new Response
                {
                    Code = StatusCodes.Status500InternalServerError,
                    Status = Status.Error,
                    Message = "An error occurred while creating feedback."
                };
                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }
        }
        [Route("Feedbacks")]
        [HttpGet]
        public async Task<IActionResult> GetListFeedback([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] int movieID=0)
        {
            var feedbacks = await _feedbackRepository.GetListFeedbackByMovie(page, pageSize, movieID);
            if (feedbacks == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No feedback in database");
            }
            return StatusCode(StatusCodes.Status200OK, feedbacks);
        }
    } 
}
