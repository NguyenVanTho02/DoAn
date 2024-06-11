using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    public class Post
    {
        public int PostID { get; set; }
        public string Title { get; set; }
        public string ImagePoster { get; set; }
        public string Content { get; set; }
        public string UserID { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
