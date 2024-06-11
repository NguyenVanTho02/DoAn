using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.MovieModel;
using Movie.SERVICES.Interfaces.IRepositories;
using Movie.SERVICES.Repositories;
using MovieApi.Extensions;
using MovieApi.Helpers;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net.WebSockets;
using System.Security.AccessControl;
using static System.Net.Mime.MediaTypeNames;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private IMapper _mapper;
        private IMovieRepository _movieRepository;
        public MovieController(IMovieRepository movieRepository, IMapper mapper)
        {
            _mapper = mapper;
            _movieRepository = movieRepository;
        }
        [Route("Movies")]
        [HttpGet]
        public async Task<IActionResult> GetMovieList([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filter = "")
        {
            var movieList = await _movieRepository.GetListMovie(page, pageSize, filter);
            if (movieList == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No movie in database");
            }
            return StatusCode(StatusCodes.Status200OK, movieList);
        }
        [Route("ShowNow")]
        [HttpGet]
        public async Task<IActionResult> GetMovieShowNowOrCommingSoon([FromQuery] bool showNow = false, [FromQuery] bool commingSoon = false)
        {
            var movieList = await _movieRepository.GetListMovieShowNowOrCommingSoon(showNow, commingSoon);
            var result = new Response<IEnumerable<MovieResultVm>>
            {
                Data = _mapper.Map<IEnumerable<MovieResultVm>>(movieList),
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get succses"
            };
            return Ok(result);
        }
        [Route("MovieInfo/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetInfoMovie(int id)
        {
            var movie = await _movieRepository.GetByIdAsync(id);
            if (movie == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No movie in database");
            }

            var result = new Response<MovieResultVm>
            {
                Data = _mapper.Map<MovieResultVm>(movie),
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Ok"
            };
            return Ok(result);
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _movieRepository.GetByIdAsync(id);
            if (movie == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No movie found to delete"
                });
            }
            await _movieRepository.DeleteAsync(movie);
            await _movieRepository.RemoveImage(movie.Images);
            await _movieRepository.RemoveImage(movie.Poster);
            await _movieRepository.SaveChangesAsync();
            return Ok(new Response { Status = Status.Success, Message = "Delete success", Code = StatusCodes.Status200OK });

        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("CreateMovieUpload")]
        [HttpPost]
        public async Task<IActionResult> CreateMovieUpload([FromForm] string datajson, IFormFile[] fileImages, IFormFile filePoster)
        {
            var movie = JsonConvert.DeserializeObject<Movie.INFARSTRUTURE.Entities.Movie>(datajson);
            string images = "";
            foreach (var file in fileImages)
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", file.FileName);
                using (var stream = System.IO.File.Create(path))
                {
                    await file.CopyToAsync(stream);

                }
                images += "/images/" + file.FileName + ";";
            }
            var pathPoster = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", filePoster.FileName);
            using (var stream = System.IO.File.Create(pathPoster))
            {
                await filePoster.CopyToAsync(stream);

            }
            var poster = "/images/" + filePoster.FileName;
            movie.Images = images;
            movie.Poster = poster;
            await _movieRepository.CreateAsync(movie);
            await _movieRepository.SaveChangesAsync();
            var result = _mapper.Map<MovieResultVm>(movie);
            return StatusCode(StatusCodes.Status200OK, result);
        }
        [Authorize(Roles = AppRole.Admin)]
        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateMovie([Required] int id, [FromForm] string datajson, IFormFile[] fileImages, IFormFile? filePoster)
        {
            var movieOld = await _movieRepository.GetByIdAsync(id);
            if (movieOld == null)
            {
                return BadRequest(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No movie found to update"
                });
            }
            //var movieEdit = JsonConvert.DeserializeObject<Movie.INFARSTRUTURE.Entities.Movie>(datajson);

            var movieEdit = JsonConvert.DeserializeObject<MovieEditViewModel>(datajson);
            string poster = "";  
            string images = "";
            if (filePoster != null)
            {
                var pathPoster = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", filePoster.FileName);
                using (var stream = System.IO.File.Create(pathPoster))
                {
                    await filePoster.CopyToAsync(stream);

                }
                poster = "/images/" + filePoster.FileName;
                await _movieRepository.RemoveImage(movieEdit.PosterOld);

            }
            else
            {
                poster = movieEdit.PosterOld;
            }
            if (fileImages != null)
            {
                foreach (var file in fileImages)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", file.FileName);
                    using (var stream = System.IO.File.Create(path))
                    {
                        await file.CopyToAsync(stream);

                    }
                    images += "/images/" + file.FileName + ";";
                }
                string[] imageArr = movieOld.Images.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                string[] imageOldArr = movieEdit.ImagesOld.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                string[] imagesArrMustDelete = imageArr.Except(imageOldArr).ToArray();
                string imagesMustDelete = string.Join(";", imagesArrMustDelete);
                await _movieRepository.RemoveImage(imagesMustDelete);
                images = movieEdit.ImagesOld + images;
            }
            else
            {
                images = movieEdit.ImagesOld;
            }
            var movieUpdate = _mapper.Map(movieEdit, movieOld);
            movieUpdate.Images = images;
            movieUpdate.Poster = poster;
            await _movieRepository.UpdateAsync(movieUpdate);
            var result = new Response
            {
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Update movie success"
            };
            return Ok(result);
        }
    }
}
