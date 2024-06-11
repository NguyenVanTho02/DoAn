using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    public class Booking
    {
        public int BookingID { get; set; }
        public int PaymentID { get; set; }
        public int ShowSeatID { get; set; }
        public DateTime BookingDate { get; set; }
        public int TotalPrice { get; set; }
        public virtual Payment Payment { get; set; }
        public virtual ShowSeat ShowSeat { get; set; }
    }
}
