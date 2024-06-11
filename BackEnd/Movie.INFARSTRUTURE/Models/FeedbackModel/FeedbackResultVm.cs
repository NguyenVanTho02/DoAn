using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.FeedbackModel
{
    public class FeedbackResultVm
    {
        public int FeedbackID { get; set; }
        public string? Content { get; set; }
        public int Rate { get; set; }
        public int MovieID { get; set; }
        public DateTime DateFeedback { get; set; }
        public string UserName { get; set; }
    }
}
