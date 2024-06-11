using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.CinemaModel
{
    public class CinemaResultVmByCity
    {
        public int CinemaID { get; set; }
        public string CinemaName { get; set; }
        public string? CinemaAddress { get; set; }
        public List<TheaterVm> ListTheater { get; set; }
    }
    public class TheaterVm
    {
        public int TheaterID { get; set; }
        public string TheaterName { get; set; }
    }
}
