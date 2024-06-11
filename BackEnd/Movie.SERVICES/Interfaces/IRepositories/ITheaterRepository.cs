using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.TheaterModel;
using Movie.INFARSTRUTURE.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface ITheaterRepository:IGenericRepository<INFARSTRUTURE.Entities.Theater>
    {
        public Task<PageList<TheaterResultVm>> GetListTheater(int current, int pageSize, string filter = "");
        public Task<IEnumerable<TheaterResultVm>> TheatersByCinema(int cinemaID);
    }
}
