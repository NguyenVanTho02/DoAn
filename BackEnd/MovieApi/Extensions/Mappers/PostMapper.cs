using AutoMapper;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.PostModel;

namespace MovieApi.Extensions.Mappers
{
    public class PostMapper : Profile
    {
        public PostMapper() 
        {
            CreateMap<Post, PostResultVm>().ReverseMap();
            CreateMap<Post, PostViewModel>().ReverseMap();
        }

    }
}
