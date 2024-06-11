using AutoMapper;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.MovieModel;
using Movie.INFARSTRUTURE.Models.SeatModel;

namespace MovieApi.Extensions.Mappers
{
    public class SeatMapper : Profile
    {
        public SeatMapper()
        {
            CreateMap<Seat, SeatResultVm>().ReverseMap();
            CreateMap<SeatResultVm, Seat>().ReverseMap();
            CreateMap<SeatViewModel, Seat>().ReverseMap();

        }
    }
}
