using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    public class ShowSeat
    {
        public int ShowSeatID { get; set; }
        public int ShowID { get; set; }
        public int SeatID { get; set; }
        public int SeatStatus { get; set; }
        public int Price { get; set; }
        
        public virtual Booking? Booking { get; set; }
        public virtual Seat Seat { get; set; }
        public virtual Show Show { get; set; }
    }
}
