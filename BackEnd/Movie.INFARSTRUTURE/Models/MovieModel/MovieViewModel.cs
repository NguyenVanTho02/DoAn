using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Movie.INFARSTRUTURE.Models.MovieModel
{
    public class MovieViewModel
    {
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
        public IFormFile Poster { get; set; }     
        public string Language { get; set; }
        public int GenreID { get; set; }
        public IFormFile Images { get; set; }
    }
}
