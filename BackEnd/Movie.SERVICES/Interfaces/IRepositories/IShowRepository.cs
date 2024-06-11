using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.ShowModel;
using Movie.INFARSTRUTURE.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface IShowRepository : IGenericRepository<INFARSTRUTURE.Entities.Show>
    {
        public Task<PageList<ShowResultVm>> GetListShow(int current, int pageSize, string filter = "", int movieID = 0);
        public Task<IEnumerable<Show>> GetListShowByMovie(ShowByMovieVm showVm);
        public Task<ShowInfoResult> GetInfoShow(int showID);
        public Task<IEnumerable< ShowByCinemaResult>> GetListMovieByCinema(int cinemaID,DateTime showDate);
    }
}
