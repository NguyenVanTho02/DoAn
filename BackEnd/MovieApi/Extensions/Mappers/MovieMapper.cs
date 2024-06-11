using AutoMapper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.MovieModel;
namespace MovieApi.Extensions.Mappers
{
    public class MovieMapper:Profile  
    {
        public MovieMapper()
        {
            CreateMap<Movie.INFARSTRUTURE.Entities.Movie, MovieViewModel>().ReverseMap();
            CreateMap<Movie.INFARSTRUTURE.Entities.Movie, MovieResultVm>().ReverseMap();
            CreateMap<MovieViewModel, Movie.INFARSTRUTURE.Entities.Movie>().ReverseMap();  
            CreateMap<MovieEditViewModel, Movie.INFARSTRUTURE.Entities.Movie>().ReverseMap();

        }
    }
}
