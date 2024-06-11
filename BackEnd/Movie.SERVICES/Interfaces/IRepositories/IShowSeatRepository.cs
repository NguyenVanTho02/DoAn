using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.ShowSeat;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface IShowSeatRepository : IGenericRepository<INFARSTRUTURE.Entities.ShowSeat>
    {
        public Task<IEnumerable<ShowSeat>> GetListShowSeatByShowId(int showsID);
    }
}
