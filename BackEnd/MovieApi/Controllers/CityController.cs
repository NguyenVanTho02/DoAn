using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.SERVICES.Interfaces.IRepositories;
using Movie.SERVICES.Repositories;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using MovieApi.Extensions;
using MovieApi.Helpers;
using Movie.INFARSTRUTURE.Models.CityModel;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private IMapper _mapper;
        private ICityRepository _cityRepository;
        private ICinemaRepository _cinemaRepository;

        public CityController(ICityRepository cityRepository, IMapper mapper, ICinemaRepository cinemaRepository)
        {
            _mapper = mapper;
            _cityRepository = cityRepository;
            _cinemaRepository = cinemaRepository;
        }
        [Route("List-cinema")]
        [HttpGet]
        public async Task<IActionResult> GetListCinema()
        {

            var cinemaCitys = await _cityRepository.GetListCinemaCity();
            if (cinemaCitys == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No cinema in database");
            }
            var result = new Response<IEnumerable<CityCinemaResultVm>>
            {
                Data = cinemaCitys,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Get cinema success"
            };

            return Ok(result);


        }


        [Route("List-city")]
        [HttpGet]
        public async Task<IActionResult> GetListCity()
        {
            var cityList = await _cityRepository.GetAll();
            if (cityList == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No movie in database");
            }

            return StatusCode(StatusCodes.Status200OK, cityList);
        }

        [Route("Name-city/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetCityById(int id)
        {
            var city = await _cityRepository.GetByIdAsync(id);
            if (city == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No city in database");
            }
            return Ok(city.CityName);
        }

    }
}
