using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    public class Theater
    {
        public int TheaterID { get; set; }
        public string TheaterName { get; set; }
        public int CinemaID { get; set; }
        public int QtySeat { get; set; }
        public virtual Cinema Cinema { get; set; }
        public virtual ICollection<Show> Show { get; set; }
        public virtual ICollection<Seat> Seat { get; set; }
    }
}
