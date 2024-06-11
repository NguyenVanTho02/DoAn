using AutoMapper;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.UserModel;


namespace MovieApi.Extensions.Mappers
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {          
            CreateMap<ApplicationUser, LoginViewModel>().ReverseMap();
            CreateMap<ApplicationUser, RegisterViewModel>().ReverseMap();
            CreateMap<ApplicationUser, UserResultVm>().ReverseMap();
        }
    }
}
