using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.PaymentModel
{
    public class BookingInfoResultVm
    {
        public string MovieName { get; set; }
        public int PaymentID { get; set; }
        public DateTime PaymentDate { get; set; }
        public string TicketCode { get; set; }
        public string CinemaName { get; set; }
        public string? CinemaAddress { get; set; }
        public string TheaterName { get; set; }
        public string ShowDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string? SeatNames { get; set; }
        public int Amount { get; set; }
        public int Duration { get; set; }
        public string UserId { get; set; }
    }
}
