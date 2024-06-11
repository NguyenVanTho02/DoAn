using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.ShowModel
{
    public class ShowResultVm
    {
        public int ShowID { get; set; }
        public DateTime ShowDate { get; set; }
        public string? MovieName { get; set; }
        public int ? MovieID { get; set; }
        public int TheaterID { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
    }
}
