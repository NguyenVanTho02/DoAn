using AutoMapper;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.FeedbackModel;

namespace MovieApi.Extensions.Mappers
{
    public class FeedbackMapper : Profile
    {
        public FeedbackMapper()
        {
            CreateMap<Movie.INFARSTRUTURE.Entities.Feedback, FeedbackVm>().ReverseMap();
            CreateMap<Movie.INFARSTRUTURE.Entities.Feedback, FeedbackResultVm>().ReverseMap();

        }
    }
}
