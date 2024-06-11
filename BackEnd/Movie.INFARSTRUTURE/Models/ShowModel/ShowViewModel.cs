﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.ShowModel
{
    public class ShowViewModel
    {
        public int TheaterID { get; set; }
        public int MovieID { get; set; }
        public DateTime ShowDate { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
    }
}
