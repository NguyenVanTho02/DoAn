using Movie.INFARSTRUTURE.Models.CinemaModel;
using Movie.INFARSTRUTURE.Models.MovieModel;
using Movie.INFARSTRUTURE.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface ICinemaRepository : IGenericRepository<INFARSTRUTURE.Entities.Cinema>
    {
        public Task<PageList<CinemaResultVm>> GetListCinema(int page, int pageSize, string filter = "", int city = 0);
        public Task<IEnumerable<CinemaResultVmByCity>> GetListCinemaByCity(int cityID);
    }
}

