using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.ReportModel
{
    public class RevenueByDayOfMonthResultVm
    {
        public int Day { get; set; }
        public double Revenue { get; set; }
        public int NumberOfTickets { get; set; }
    }
}
