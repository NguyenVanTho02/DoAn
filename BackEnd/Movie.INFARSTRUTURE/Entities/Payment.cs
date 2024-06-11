using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    public class Payment
    {
        public int PaymentID { get; set; }
        public DateTime PaymentDate { get; set; }
        public int Amount { get; set; }
        public string UserID { get; set; }
        public int ShowID { get; set; }
        public int NumberOfTicket { get; set; }
        public string TicketCode { get; set; }
        public string? PaymentStatus { get; set; }
        public string? PaymentMethod { get; set; }
        public string? PaymentInfo { get; set; }
        public string? TransactionID { get; set; }
        public virtual ICollection<Booking> Booking { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual Show Show { get; set; }

    }
}
