using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    public class Show
    {
        public int ShowID { get; set; }
        public DateTime ShowDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int MovieID { get; set; }
        public int TheaterID { get; set; }
        public virtual Movie Movie { get; set; }
        public virtual Theater Theater { get; set; }
        public ICollection<ShowSeat> ShowSeat { get; set; }
        public ICollection<Payment> Payment { get; set; }
    }
}
