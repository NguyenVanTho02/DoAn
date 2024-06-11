using AutoMapper;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.TheaterModel;
using Movie.INFARSTRUTURE.Models.UserModel;

namespace MovieApi.Extensions.Mappers
{
    public class TheaterMapper : Profile
    {
        public TheaterMapper()
        {
            CreateMap<Theater, TheaterViewModel>().ReverseMap();
            CreateMap<Theater, TheaterResultVm>().ReverseMap();
        }
    }
}
