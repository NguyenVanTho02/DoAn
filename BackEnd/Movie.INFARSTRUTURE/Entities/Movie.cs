using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    
    public class Movie
    {
        public int MovieID { get; set; }   
        public string MovieName { get; set; }
        public string? Trailer { get; set; }
        public string? Summary { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int Duration { get; set; }
        public int Age { get; set; }
        public bool CommingSoon { get; set; }
        public bool ShowNow { get; set; }
        public bool Hot {  get; set; }
        public string Actors { get; set; }
        public string Directors { get; set; }
        public string Poster { get; set; }
        public string? Images { get; set; }
        public string? Language { get; set; }
        public int GenreID { get; set; }
        public virtual Genre Genre { get; set; }
        public virtual ICollection<Show> Show { get; set; }
        public virtual ICollection<Feedback> Feedback { get; set; }

    }
}
