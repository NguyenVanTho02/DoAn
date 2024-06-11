using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.PaymentModel
{
    public class BookingViewModel
    {
        public int BookingID { get; set; }
        public DateTime BookingDate { get; set; }
        public int NumberOfTicket { get; set; }
        public int TotalPrice { get; set; }
        public int ShowID { get; set; }
        public int ShowSeatID { get; set; }
        public string UserID { get; set; }
    }
}
