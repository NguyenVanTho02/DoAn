using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.FeedbackModel
{
    public class FeedbackVm
    {
        public string? Content { get; set; }
        public int Rate { get; set; }
        public int MovieID { get; set; }
        public string UserID { get; set; }
    }
}  
