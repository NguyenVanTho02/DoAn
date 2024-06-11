using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.TicketModel
{
    public class TicketResultVm
    {
        public int PaymentID { get; set; }
        public string TicketCode { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string MovieName { get; set; }
        public DateTime ShowDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
}
