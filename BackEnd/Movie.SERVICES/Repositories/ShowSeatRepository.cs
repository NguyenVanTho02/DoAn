using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.ShowSeat;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;

namespace Movie.SERVICES.Repositories
{
    public class ShowSeatRepository : GenericRipository<ShowSeat>, IShowSeatRepository
    {
        private IMapper _mapper;
        public ShowSeatRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task<IEnumerable<ShowSeat>> GetListShowSeatByShowId(int showsID)
        {
            var listShowSeat = await _context.ShowSeat.Where(e => e.ShowID == showsID).ToListAsync();
            return listShowSeat;
        }
    }
}
