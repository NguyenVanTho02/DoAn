using AutoMapper;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.MovieModel;

namespace MovieApi.Extensions.Mappers
{
    public class CinemaMapper:Profile
    {
        public CinemaMapper()
        {
            CreateMap<Movie.INFARSTRUTURE.Entities.Cinema, CinemaViewModel>().ReverseMap();
            CreateMap<CinemaViewModel, Movie.INFARSTRUTURE.Entities.Cinema>().IgnoreAllNonExisting();
            CreateMap<Movie.INFARSTRUTURE.Entities.Cinema, CinemaResultVm>().ReverseMap();
        }
    }
}
