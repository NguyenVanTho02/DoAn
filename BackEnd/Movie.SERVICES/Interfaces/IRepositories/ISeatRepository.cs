using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.SeatModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface ISeatRepository : IGenericRepository<INFARSTRUTURE.Entities.Seat>
    {
        public Task<int> InsertListSeat(int qtySeat, int theaterID);
        public Task<IEnumerable<Seat>> GetListSeatByTheater(int theaterID);
        //public Task<bool> UpdateListSeat(string listSeat);
    }
}
