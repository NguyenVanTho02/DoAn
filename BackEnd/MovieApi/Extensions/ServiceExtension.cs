using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.SERVICES.Interfaces.IRepositories;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Repositories;
using MovieApi.Extensions.Mappers;

namespace MovieApi.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddDIServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMovieRepository, MovieRepository>();
            services.AddScoped<ICinemaRepository, CinemaRepository>();
            services.AddScoped<IShowRepository, ShowRepository>();
            services.AddScoped<ITheaterRepository, TheaterRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<ISeatRepository, SeatRepository>();
            services.AddScoped<IShowSeatRepository, ShowSeatRepository>();
            services.AddScoped<IVnpayServices, VnpayServices>();
            services.AddScoped<IBookingRepository, BookingRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddScoped<IFeedbackRepository, FeebackRepository>();
            services.AddAutoMapper(typeof(UserMapper).Assembly);
            return services;
        }
        public static IServiceCollection AddGoogleAuthenticate(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication().AddGoogle(googleOptions =>
            {
                googleOptions.ClientId = configuration["ExternalAuthen:Google:ClientId"];
                googleOptions.ClientSecret = configuration["ExternalAuthen:Google:ClientSecret"];
                googleOptions.CallbackPath = configuration["ExternalAuthen:Google:CallbackPath"];
            });
            return services;
        }
    }
}
