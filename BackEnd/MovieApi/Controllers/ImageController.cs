using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieApi.Extensions;
using MovieApi.Helpers;
using static System.Net.Mime.MediaTypeNames;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ImageController : ControllerBase
    {
        [Route("UploadImages")]
        [HttpPost]
        public async Task<IActionResult> UploadImages(IFormFile[] fileImages)
        {
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
            var result = new Response<string>
            {
                Data = images,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Upload images success"
            };
            return Ok(result);
        }
        [Route("UploadImage")]
        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile fileImage)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileImage.FileName);
            using (var stream = System.IO.File.Create(path))
            {
                await fileImage.CopyToAsync(stream);

            }
            var image = "/images/" + fileImage.FileName;
            var result = new Response<string>
            {
                Data = image,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Upload image success"
            };
            return Ok(result);
        }
        [Route("DeleteImage")]
        [HttpPost]
        public async Task<IActionResult> RemoveImage(string images)
        {
            string[] imageArr = images.Split(new[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (string image in imageArr)
            {
                try
                {
                    var path = "C:\\Users\\minh.lephu\\Desktop\\DATN\\MovieTicket\\MovieApi\\wwwroot" + image;
                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }
                    else
                    {
                        throw new FileNotFoundException($"File {path} not found.");
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error deleting file: {ex.Message}", ex);
                }
            }

            return StatusCode(StatusCodes.Status200OK);
        }
    }
}