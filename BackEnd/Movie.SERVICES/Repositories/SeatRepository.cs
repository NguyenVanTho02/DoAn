using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.SeatModel;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Repositories
{
    public class SeatRepository : GenericRipository<INFARSTRUTURE.Entities.Seat>, ISeatRepository
    {
        private IMapper _mapper;
        public SeatRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task<IEnumerable<Seat>> GetListSeatByTheater(int theaterID)
        {
            var listSeat = await _context.Seats.Where(s => s.TheaterID == theaterID).ToListAsync();
            return listSeat;
        }

        public async Task<int> InsertListSeat(int qtySeat, int theaterID)
        {
            var rowsAffected = await _context.Database.ExecuteSqlRawAsync("EXEC InsertSeat @qtySeat, @theaterID",
               new[] {
                    new SqlParameter("@qtySeat", qtySeat),
                    new SqlParameter("@theaterID", theaterID),
               });

            if (rowsAffected > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

        //public async Task<bool> UpdateListSeat(string listSeat)
        //{
        //    var seats = JsonConvert.DeserializeObject<List<Movie.INFARSTRUTURE.Entities.Seat>>(listSeat).ToArray();
        //    for(int i= 0;i< seats.Length; i++)
        //    {
        //        var seat = 
        //        await UpdateAsync(seats[i]);
        //    }
        //    await _context.SaveChangesAsync();
        //}
    }
}
