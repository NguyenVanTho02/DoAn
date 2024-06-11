using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.PaymentModel
{
    public class OderViewModel
    {
        public DateTime PaymentDate { get; set; }
        public int Amount { get; set; }
        public string UserID { get; set; }
        public int ShowID { get; set; }
        public int NumberOfTicket { get; set; }
        public string? PaymentStatus { get; set; }
        public string? PaymentMethod { get; set; }
        public string? PaymentInfo { get; set; }
        public string? TransactionID { get; set; }


    
        public int ShowSeatID { get; set; }
        public DateTime BookingDate { get; set; }
        public int TotalPrice { get; set; }
    }
}
