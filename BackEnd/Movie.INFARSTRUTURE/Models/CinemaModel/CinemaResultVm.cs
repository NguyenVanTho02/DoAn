using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.CinemaModel
{
    public class CinemaResultVm
    {
        public int CinemaID { get; set; }
        public string CinemaName { get; set; }
        public string? CinemaAddress { get; set; }
        public int CityID { get; set; }
        public string CityName { get; set; }
    }
}
