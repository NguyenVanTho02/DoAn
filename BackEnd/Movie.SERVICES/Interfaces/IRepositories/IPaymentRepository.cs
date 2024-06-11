using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Movie.INFARSTRUTURE.Models.PaymentModel;
using Movie.INFARSTRUTURE.Models.TicketModel;
using Movie.INFARSTRUTURE.Utilities;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface IPaymentRepository: IGenericRepository<INFARSTRUTURE.Entities.Payment>
    {
        public Task<BookingInfoResultVm> BookingInfo(int paymentID);
        public Task<PageList<TicketResultVm>> GetTicketsInfo(int page, int pageSize, string filter = "");
        public Task<bool> UserHasPurchasedTicketForMovieAsync(string userID, int movieID);
    }
}
