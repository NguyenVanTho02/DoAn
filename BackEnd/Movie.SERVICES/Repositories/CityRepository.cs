using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.CityModel;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Repositories
{
    public class CityRepository : GenericRipository<City>, ICityRepository
    {
        private IMapper _mapper;
        public CityRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task<IEnumerable<CityCinemaResultVm>> GetListCinemaCity()
        {
            var cityCinemaResults = await _context.Cities
                .Select(city => new CityCinemaResultVm
                {
                    CityID = city.CityID,
                    CityName = city.CityName,
                    ListCinema = _context.Cinemas
                        .Where(cinema => cinema.CityID == city.CityID)
                        .Select(cinema => new CinemaVm
                        {
                            CinemaID = cinema.CinemaID,
                            CinemaName = cinema.CinemaName,
                            CinemaAddress = cinema.CinemaAddress,
                            CityID = cinema.CityID
                        })
                        .ToList()
                })
                .Where(result => result.ListCinema.Any())
                .ToListAsync();

            return cityCinemaResults;
        }
    }
}
