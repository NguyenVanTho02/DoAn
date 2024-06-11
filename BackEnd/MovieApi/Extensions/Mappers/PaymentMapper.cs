using AutoMapper;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.MovieModel;
using Movie.INFARSTRUTURE.Models.PaymentModel;

namespace MovieApi.Extensions.Mappers
{
    public class PaymentMapper : Profile
    {
        public PaymentMapper()
        {
          
            CreateMap<OderViewModel,PaymentViewModel >().ReverseMap();
            CreateMap<OderViewModel, BookingViewModel>().ReverseMap();
            CreateMap<Movie.INFARSTRUTURE.Entities.Payment, OderViewModel>().ReverseMap();
            CreateMap<OderViewModel, Movie.INFARSTRUTURE.Entities.Payment>().ReverseMap();
            CreateMap<OderViewModel, Movie.INFARSTRUTURE.Entities.Booking>().ReverseMap();
            CreateMap< Movie.INFARSTRUTURE.Entities.Booking, OderViewModel>().ReverseMap();
        }
    }
    }
