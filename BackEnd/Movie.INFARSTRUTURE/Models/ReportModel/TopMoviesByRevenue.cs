using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.ReportModel
{
    public class TopMoviesByRevenue
    {
        public string MovieName { get; set; }
        public decimal Revenue { get; set; }
        public int NumberOfTicketsSold { get; set; }

    }
}
