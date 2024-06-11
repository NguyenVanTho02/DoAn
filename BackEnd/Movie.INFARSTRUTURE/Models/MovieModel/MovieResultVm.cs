using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.MovieModel
{
    public class MovieResultVm
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
        public bool Hot { get; set; }
        public string Actors { get; set; }
        public string Directors { get; set; }
        public string Poster { get; set; }
        public string Images { get; set; }
        public string Language { get; set; }
        public int GenreID { get; set; }
    }
}
