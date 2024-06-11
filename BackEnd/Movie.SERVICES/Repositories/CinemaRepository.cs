using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.MovieModel;
using Movie.INFARSTRUTURE.Utilities;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Movie.SERVICES.Repositories
{
    public class CinemaRepository : GenericRipository<INFARSTRUTURE.Entities.Cinema>, ICinemaRepository
    {
        private IMapper _mapper;
        public CinemaRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork)
        {
            _mapper = mapper;
        }
        public async Task<PageList<CinemaResultVm>> GetListCinema(int page, int pageSize, string filter = "", int city = 0)
        {
            var query = (from c in _context.Cinemas
                              join ci in _context.Cities on c.CityID equals ci.CityID
                              select new CinemaResultVm
                              {
                                  CinemaID = c.CinemaID,
                                  CinemaName = c.CinemaName,
                                  CinemaAddress = c.CinemaAddress,
                                  CityID = c.CityID,
                                  CityName = ci.CityName
                              });
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(c => c.CinemaName.Contains(filter));
            }
            if (city != 0)
            {
                query = query.Where(c => c.CityID == city);
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            query = query.Skip((page - 1) * pageSize).Take(pageSize);
            var cinemas = await query.ToListAsync();
            var resultItems = _mapper.Map<IEnumerable<CinemaResultVm>>(cinemas);
            var result = PageList<CinemaResultVm>.Create(resultItems, page, pageSize, totalCount, totalPages);
            return result;
        }

        public async Task<IEnumerable<CinemaResultVmByCity>> GetListCinemaByCity(int cityID)
        {
            var listCinema = await (from cinema in _context.Cinemas
                                    join city in _context.Cities
                                   on cinema.CityID equals city.CityID
                                    join theater in _context.Theaters on cinema.CinemaID equals theater.CinemaID
                                    where city.CityID == cityID
                                    select new CinemaResultVmByCity
                                    {
                                        CinemaID = cinema.CinemaID,
                                        CinemaName = cinema.CinemaName,
                                        CinemaAddress = cinema.CinemaAddress,
                                        ListTheater = cinema.Theater.Select(t => new TheaterVm
                                        {
                                            TheaterID = t.TheaterID,
                                            TheaterName = t.TheaterName,
                                        }).ToList(),
                                    }).GroupBy(x => x.CinemaID)
                           .Select(g => g.First()).ToListAsync();
            return listCinema;
        }
    }
}
