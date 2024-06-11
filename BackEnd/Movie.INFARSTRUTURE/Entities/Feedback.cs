using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Entities
{
    public class Feedback
    {
        public int FeedbackID { get; set; }
        public string? Content { get; set; }
        public int Rate { get; set; }
        public int MovieID { get; set; }
        public DateTime DateFeedback { get; set; }
        public string UserID { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual Movie? Movie { get; set; }
    }
}
