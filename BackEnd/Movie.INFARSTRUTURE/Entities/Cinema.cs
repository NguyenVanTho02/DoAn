using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    public class Cinema
    {
        public int CinemaID { get; set; }
        public string CinemaName { get; set; }
        public string? CinemaAddress { get; set; }
        public int CityID { get; set; }
        public City City { get; set; }
        public virtual ICollection<Theater> Theater { get; set; }
    }
}
