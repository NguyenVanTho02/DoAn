using Movie.INFARSTRUTURE.Models.Vnpay;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface IVnpayServices
    {
        Task<string> CreatePaymentUrl(HttpContext context, VnPaymentRequestModel model);
 
    }
}