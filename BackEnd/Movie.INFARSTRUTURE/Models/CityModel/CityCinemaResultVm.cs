using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Movie.INFARSTRUTURE.Models.CinemaModel;

namespace Movie.INFARSTRUTURE.Models.CityModel
{
    public class CityCinemaResultVm
    {
        public int CityID { get; set; }
        public string CityName { get; set; }
        public List<CinemaVm> ListCinema { get; set; }
    }
    public class CinemaVm
    {
        public int CinemaID { get; set; }
        public string CinemaName { get; set; }
        public string? CinemaAddress { get; set; }
        public int CityID { get; set; }
    }
}
