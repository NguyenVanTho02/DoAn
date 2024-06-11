using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.Vnpay
{
    public class VnPaymentResponseModel
    {

 
        public int PaymentId { get; set; }
        public string Transactionstatus { get; set; }
       
    }
    public class VnPaymentRequestModel
    {
        [Required]
        public int OrderId { get; set; }
       
        [Required]
        public Double Amount { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
    }
}
