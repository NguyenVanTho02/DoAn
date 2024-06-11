using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Movie.INFARSTRUTURE.Models.ReportModel;

namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface IReportRepository
    {
        public Task<IEnumerable<RevenueByDayOfMonthResultVm>> GetRevenueByDayOfMonth(int year, int month);
        public Task<IEnumerable<TopMoviesByRevenue>> GetTopMovieByRevenue();
    }
}
