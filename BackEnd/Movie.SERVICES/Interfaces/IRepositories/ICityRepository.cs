using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.CityModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface ICityRepository : IGenericRepository<City>
    {
        public Task<IEnumerable<CityCinemaResultVm>> GetListCinemaCity();
    }
}
