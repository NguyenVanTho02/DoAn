using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
namespace Movie.INFARSTRUTURE.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(255)]
        public string? Address { get; set; }
        [DataType(DataType.Date)]
        public DateTime? Birthday { set; get; }
        public virtual ICollection<Payment> Payment { get; set; }
        public virtual ICollection<Post> Post { get; set; }
        public virtual ICollection<Feedback> Feedback { get; set; }
    }
}
