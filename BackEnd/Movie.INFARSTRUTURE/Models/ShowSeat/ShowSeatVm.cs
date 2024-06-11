using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.ShowSeat
{
    public class ShowSeatVm
    {
        public int ShowID { get; set; }
        public int SeatID { get; set; }
        public int? BookingID { get; set; }
        public int SeatStatus { get; set; }
        public int Price { get; set; }
    }
}
