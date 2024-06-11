using AutoMapper;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.ShowModel;
using Movie.INFARSTRUTURE.Models.ShowSeat;

namespace MovieApi.Extensions.Mappers
{
    public class ShowSeatMapper : Profile
    {
        public ShowSeatMapper()
        {
            CreateMap<ShowSeat, ShowSeatVm>().ReverseMap();
        }
    }
}
