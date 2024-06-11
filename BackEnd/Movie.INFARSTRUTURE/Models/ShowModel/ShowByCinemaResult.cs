using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.ShowModel
{
    public class ShowByCinemaResult
    {
        public int MovieID { get; set; }
        public string MovieName { get; set; }
        public int Duration { get; set; }
        public string GenreName { get; set; }
        public string Poster { get; set; }
        public List<ShowTime> ListShow { get; set; }

    }
    public class ShowTime
    {
        public int ShowID { get; set; }
        public DateTime ShowDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}
