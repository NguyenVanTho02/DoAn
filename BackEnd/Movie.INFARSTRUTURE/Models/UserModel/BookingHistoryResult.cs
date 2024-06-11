using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.UserModel
{
    public class BookingHistoryResult
    {
        public string MovieName { get; set; }
        public string Poster { get; set; }
        public int NumberOfTicket { get; set; }
        public string TicketCode { get; set; }
        public int Age { get; set; }
        public DateTime ShowDate { get; set; }
        public string StartTime { get; set; }
        public int Duration { get; set; }
        public DateTime PaymentDate { get; set; }
        public string CinemaName { get; set; }
        public string TheaterName { get; set; }
        public int PaymentID { get; set; }
        public string SeatName { get; set; }
        public int Amount { get; set; }
    }
}
