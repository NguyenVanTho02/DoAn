using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Models.ReportModel;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;

namespace Movie.SERVICES.Repositories
{
    public class ReportRepository : IReportRepository
    {
        protected readonly ApplicationDbContext _context;
        protected readonly IUnitOfWork _unitOfWork;
        public ReportRepository(ApplicationDbContext context, IUnitOfWork unitOfWork)
        {
            _context = context;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<RevenueByDayOfMonthResultVm>> GetRevenueByDayOfMonth(int year, int month)
        {
            DateTime thangHienTai = new DateTime(year, month, 1);
            int soNgay = DateTime.DaysInMonth(thangHienTai.Year, thangHienTai.Month);
            var result = new List<RevenueByDayOfMonthResultVm>();
            for (int day = 1; day <= soNgay; day++) 
            {
                DateTime currentDate = new DateTime(year, month, day);
                double dailyRevenue = await _context.Payments
                    .Where(payment => payment.PaymentDate.Date == currentDate.Date)
                    .SumAsync(payment => payment.Amount);

                int numberOfTickets = await _context.Payments
                     .Where(payment => payment.PaymentDate.Date == currentDate.Date)
                     .CountAsync();

                result.Add(new RevenueByDayOfMonthResultVm
                {
                    Day = day,
                    Revenue = dailyRevenue,
                    NumberOfTickets = numberOfTickets
                });
            }
            return result;
        }

        public async Task<IEnumerable<TopMoviesByRevenue>> GetTopMovieByRevenue()
        {
            var query = from payment in _context.Payments
                        join show in _context.Shows on payment.ShowID equals show.ShowID
                        join movie in _context.Movies on show.MovieID equals movie.MovieID
                        group new { payment, movie } by new { movie.MovieName } into grp
                        select new TopMoviesByRevenue
                        {
                            MovieName = grp.Key.MovieName,
                            Revenue = grp.Sum(x => x.payment.Amount),
                            NumberOfTicketsSold = grp.Sum(x => x.payment.NumberOfTicket)
                        };

            var topMovies = await query.OrderByDescending(x => x.Revenue)
                                       .Take(3)
                                       .ToListAsync();

            return topMovies;
        }
    }
}
