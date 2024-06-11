using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.TheaterModel
{
    public class TheaterResultVm
    {
        public int TheaterID { get; set; }
        public string TheaterName { get; set; }
        public int CinemaID { get; set; }
        public string CinemaName { get; set; }
        public int QtySeat { get; set; }
    }
}
