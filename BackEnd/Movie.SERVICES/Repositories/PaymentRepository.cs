using AutoMapper;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.MovieModel;
using Movie.INFARSTRUTURE.Models.PaymentModel;
using Movie.INFARSTRUTURE.Models.TicketModel;
using Movie.INFARSTRUTURE.Utilities;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.SERVICES.Repositories
{
    public class PaymentRepository : GenericRipository<INFARSTRUTURE.Entities.Payment>, IPaymentRepository
    {

        private IMapper _mapper;
        public PaymentRepository(ApplicationDbContext context, IMapper mapper, IUnitOfWork unitOfWork) : base(context, unitOfWork)
        {
            _mapper = mapper;
        }

        public async Task<BookingInfoResultVm> BookingInfo(int paymentID)
        {
            var query = from payment in _context.Payments
                        join booking in _context.Booking on payment.PaymentID equals booking.PaymentID
                        join show in _context.Shows on payment.ShowID equals show.ShowID
                        join movie in _context.Movies on show.MovieID equals movie.MovieID
                        join theater in _context.Theaters on show.TheaterID equals theater.TheaterID
                        join cinema in _context.Cinemas on theater.CinemaID equals cinema.CinemaID
                        join showSeat in _context.ShowSeat on booking.ShowSeatID equals showSeat.ShowSeatID
                        join seat in _context.Seats on showSeat.SeatID equals seat.SeatID
                        where payment.PaymentID == paymentID
                        select new
                        {
                            movie.MovieName,
                            movie.Duration,
                            payment.PaymentID,
                            payment.PaymentDate,
                            payment.TicketCode,
                            cinema.CinemaName,
                            cinema.CinemaAddress,
                            theater.TheaterName,
                            show.ShowDate,
                            show.StartTime,
                            show.EndTime,
                            seat.SeatName,
                            payment.Amount,
                            payment.UserID
                        };
            var result = await query.ToListAsync();
            var seatNames = string.Join(", ", result.Select(r => r.SeatName));
            var firstResult = result.FirstOrDefault();
            var showDate = firstResult?.ShowDate;
            var dateString = showDate?.ToString(); // Chuyển đổi ShowDate thành chuỗi ngày đầy đủ
            var dateOnlyString = dateString?.Substring(0, dateString.IndexOf(" ")); // Lấy phần ngày từ chuỗi (cắt đến khoảng trắng đầu tiên)
            var bookingInfo = new BookingInfoResultVm
            {
                MovieName = result.FirstOrDefault()?.MovieName,
                PaymentID = result.FirstOrDefault()?.PaymentID ?? 0,
                PaymentDate = result.FirstOrDefault()?.PaymentDate ?? DateTime.MinValue,
                TicketCode = result.FirstOrDefault()?.TicketCode,
                CinemaName = result.FirstOrDefault()?.CinemaName,
                CinemaAddress = result.FirstOrDefault()?.CinemaAddress,
                TheaterName = result.FirstOrDefault()?.TheaterName,
                ShowDate = dateOnlyString ?? "",
                StartTime = result.FirstOrDefault()?.StartTime,
                EndTime = result.FirstOrDefault()?.EndTime,
                SeatNames = seatNames,
                Amount = result.FirstOrDefault()?.Amount ?? 0,
                Duration = result.FirstOrDefault()?.Duration ?? 0,
                UserId = result.FirstOrDefault()?.UserID

            };
            return bookingInfo;
        }

        public async Task<PageList<TicketResultVm>> GetTicketsInfo(int page, int pageSize, string filter = "")
        {
            var query = from payment in _context.Payments
                        join user in _context.Users on payment.UserID equals user.Id
                        join show in _context.Shows on payment.ShowID equals show.ShowID
                        join movie in _context.Movies on show.MovieID equals movie.MovieID
                        select new TicketResultVm
                        {
                            PaymentID = payment.PaymentID,
                            TicketCode = payment.TicketCode,
                            UserID = payment.UserID,
                            UserName = user.UserName,
                            Email = user.Email,
                            MovieName = movie.MovieName,
                            ShowDate = show.ShowDate,
                            StartTime = show.StartTime,
                            EndTime = show.EndTime
                        };
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(mv => mv.TicketCode.Contains(filter));
            }
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            query = query.Skip((page - 1) * pageSize).Take(pageSize);
            var tickets = await query.ToListAsync();
            var result = PageList<TicketResultVm>.Create(tickets, page, pageSize, totalCount, totalPages);
            return result;
        }

        public async Task<bool> UserHasPurchasedTicketForMovieAsync(string userID, int movieID)
        {
            var payment = await _context.Payments
             .Include(p => p.Show) // Đảm bảo rằng thông tin về buổi chiếu được tải lên để so sánh với movieId
             .FirstOrDefaultAsync(p => p.UserID == userID && p.Show.MovieID == movieID);
            return payment != null;
        }
    }
}
