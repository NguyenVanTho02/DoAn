﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.PostModel
{
    public class PostViewModel
    {
        public int PostID { get; set; }
        public string Title { get; set; }
        public string ImagePoster { get; set; }
        public string Content { get; set; }
        public string UserID { get; set; }
    }
}
