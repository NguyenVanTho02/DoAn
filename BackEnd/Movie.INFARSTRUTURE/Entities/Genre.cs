using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
   
    public class Genre
    {
        public int GenreID { get; set; }
        public string GenreName { get; set; }
        public virtual ICollection<Movie> Movie { get; set; }
    }
}
