using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.TheaterModel;
using Movie.INFARSTRUTURE.Utilities;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Repositories
{
    public class TheaterRepository : GenericRipository<INFARSTRUTURE.Entities.Theater>, ITheaterRepository
    {
        private IMapper _mapper;
        public TheaterRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task<PageList<TheaterResultVm>> GetListTheater(int page, int pageSize, string filter = "")
        {
            var newTheater = (from th in _context.Theaters
                              join ci in _context.Cinemas on th.CinemaID equals ci.CinemaID
                              select new TheaterResultVm
                              {
                                  TheaterID = th.TheaterID,
                                  TheaterName = th.TheaterName,
                                  CinemaID = th.CinemaID,
                                  CinemaName = ci.CinemaName,
                                  QtySeat = th.QtySeat
                              });

            if(!string.IsNullOrEmpty(filter))
            {
                newTheater = newTheater.Where(th => th.CinemaName.Contains(filter));
            }
            var totalCount = newTheater.Count();
            var totalPage = (int)Math.Ceiling((double)totalCount / pageSize);
            newTheater = newTheater.Skip((page - 1) * pageSize).Take(pageSize);
            var theaters = await newTheater.ToListAsync();
            var resultItems = _mapper.Map<IEnumerable<TheaterResultVm>>(theaters);
            var result = PageList<TheaterResultVm>.Create(resultItems, page, pageSize, totalCount, totalPage);
            return result;

        }

        public async Task<IEnumerable<TheaterResultVm>> TheatersByCinema(int cinemaID)
        {
            var theaters = await _context.Theaters.Where(th => th.CinemaID.Equals(cinemaID)).ToListAsync();
            var resultItems = _mapper.Map<IEnumerable<TheaterResultVm>>(theaters);
            return resultItems;
        }
    }
}
