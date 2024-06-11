using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    public class City
    {
        public int CityID { get; set; }
        public string CityName { get; set; }
        public virtual ICollection<Cinema> Cinema { get; set; }
    }
}
