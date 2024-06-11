using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit.Tnef;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.PostModel;
using Movie.SERVICES.Interfaces.IRepositories;
using MovieApi.Extensions;
using MovieApi.Helpers;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private IMapper _mapper;
        private IPostRepository _postRepository;
        public PostController(IPostRepository postRepository, IMapper mapper)
        {
            _mapper = mapper;
            _postRepository = postRepository;
        }

        [Route("Posts")]
        [HttpGet]
        public async Task<IActionResult> GetListPost([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filter = "")
        {
            var postList = await _postRepository.GetListPost(page, pageSize, filter);
            if(postList == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No post in database");
            }
            return StatusCode(StatusCodes.Status200OK, postList);
        }

        [Route("DetailPost/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetDetailPost(int id)
        {
            var detailPost = await _postRepository.GetByIdAsync(id);
            if(detailPost == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No information");
            }
            return StatusCode(StatusCodes.Status200OK, detailPost);
        }

        [Route("LatestPost")]
        [HttpGet]
        public async Task<IActionResult> GetListPostLatest()
        {
            var postList = await _postRepository.GetListPostLatest();
            if(postList == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No post in database");
            }
            return StatusCode(StatusCodes.Status200OK, postList);
        }

        [Route("DeletePost")]
        [HttpDelete]
        public async Task<IActionResult> DeletePost(int id )
        {
            var post = await _postRepository.GetByIdAsync(id);
            if(post == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No post found to delete"
                });
            }
            await _postRepository.DeleteAsync(post);
            await _postRepository.SaveChangesAsync();
            return Ok(new Response
            {
                Status = Status.Success,
                Code = StatusCodes.Status200OK,
                Message = "Delete cinema success"

            });
        }

        [Route("CreatePost")]
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromForm] string datajson, IFormFile filePoster)
        {
            var post = JsonConvert.DeserializeObject<Post>(datajson);
            var pathPoster = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", filePoster.FileName);

            using (var stream = System.IO.File.Create(pathPoster))
            {
                await filePoster.CopyToAsync(stream);
            }
            var poster = "/images/" + filePoster.FileName;
            post.ImagePoster = poster;
            await _postRepository.CreateAsync(post);
            await _postRepository.SaveChangesAsync();
            var result = _mapper.Map<PostResultVm>(post);
            return StatusCode(StatusCodes.Status200OK, result);
        }

        [Route("UpdatePost/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdatePost([Required] int id, PostViewModel postVM)
        {
            var post = await _postRepository.GetByIdAsync(id);
            if(post == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No post found to update"
                });
            }
            var postData = _mapper.Map(postVM, post);
            await _postRepository.UpdateAsync(postData);
            var result = new Response
            {
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Update post success"
            };
            return Ok(result);
        }
    }
}
