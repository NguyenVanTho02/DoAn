using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie.SERVICES.Interfaces.IRepositories;
using Movie.INFARSTRUTURE.Models.Vnpay;
using Movie.INFARSTRUTURE.Models.PaymentModel;
using AutoMapper;
using Movie.SERVICES.Repositories;
using Movie.INFARSTRUTURE.Entities;
using System.Net.WebSockets;
using MovieApi.Extensions;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Asn1.Ocsp;
using MediatR;
using System.Text;
using Movie.INFARSTRUTURE.Models.TicketModel;
using Movie.INFARSTRUTURE.Models.MovieModel;
using MovieApi.Helpers;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IVnpayServices _vnpPayment;
        private readonly IBookingRepository _bookingRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IUserRepository _userRepository;
        private readonly IShowSeatRepository _showSeatRepository;
        private readonly IMailService _mailService;
        private readonly UserManager<ApplicationUser> _userManager;
        private IMapper _mapper;

        public PaymentController(IVnpayServices vnpPayment, IShowSeatRepository showSeatRepository, UserManager<ApplicationUser> userManager, IUserRepository userRepository, IBookingRepository bookingRepository, IPaymentRepository paymentRepository, IMapper mapper, IMailService mailService)
        {
            _vnpPayment = vnpPayment;
            _bookingRepository = bookingRepository;
            _userManager = userManager;
            _paymentRepository = paymentRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _showSeatRepository = showSeatRepository;
            _mailService = mailService;
        }
        static string GenerateRandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder stringBuilder = new StringBuilder(length);

            for (int i = 0; i < length; i++)
            {
                stringBuilder.Append(chars[random.Next(chars.Length)]);
            }

            return stringBuilder.ToString();
        }
        [HttpPost("ThanhToanVNpay")]
        public async Task<IActionResult> ThanhToanVNpay(List<OderViewModel> oder)
        {
            bool processPaymentSuccess = false;

            VnPaymentRequestModel model = new VnPaymentRequestModel();
            try
            {
                if (oder.Count == 0)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "bạn chưa gửi thông tin thanh toán");
                }
                var pay = oder.FirstOrDefault();
                string userid = _userRepository.GetUserByUserName(pay.UserID).Result.id;
                pay.UserID = userid;
                var payment = _mapper.Map<Movie.INFARSTRUTURE.Entities.Payment>(pay);
                payment.NumberOfTicket = oder.Count();
                payment.TicketCode = GenerateRandomString(10);
                await _paymentRepository.CreateAsync(payment);

                await _paymentRepository.SaveChangesAsync();
                bool check = false;
                model.Amount = payment.Amount;
                model.OrderId = payment.PaymentID;
                model.CreatedDate = payment.PaymentDate;
                string ve = "";

                List<Booking> id = new List<Booking>();
                foreach (var e in oder)
                {
                    Booking booking = new Booking();
                    booking = _mapper.Map<Movie.INFARSTRUTURE.Entities.Booking>(e);
                    booking.PaymentID = payment.PaymentID;

                    await _bookingRepository.CreateAsync(booking);
                    ShowSeat data = _showSeatRepository.GetByIdAsync(booking.ShowSeatID).Result;
                    if (data == null || data.SeatStatus == 2)
                    {

                        ve = booking.ShowSeatID.ToString();
                        break;
                    }
                    data.SeatStatus = 2;
                    await _showSeatRepository.UpdateAsync(data);
                    id.Add(booking);

                }
                if (check == true)
                {
                    await _paymentRepository.DeleteAsync(payment);
                    await _paymentRepository.SaveChangesAsync();
                    if (id.Count > 0)
                    {
                        await _bookingRepository.DeleteListAsync(id);
                        await _bookingRepository.SaveChangesAsync();
                    }
                    return StatusCode(StatusCodes.Status400BadRequest, "vé" + ve + " đã tồn tại");
                }
                await _bookingRepository.SaveChangesAsync();
                await _showSeatRepository.SaveChangesAsync();

                
                var result = await _vnpPayment.CreatePaymentUrl(HttpContext, model);
                if (result == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                return StatusCode(StatusCodes.Status200OK, result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, model);
            }

        }
        [HttpGet("ProcessPaymentrel")]
        public async Task<IActionResult> ProcessPaymentrel(
           string vnp_Amount,
         string vnp_BankCode,
         string vnp_BankTranNo,
         string vnp_CardType,
         string vnp_OrderInfo,
         string vnp_PayDate,
         string vnp_ResponseCode,
         string vnp_TmnCode,
         string vnp_TransactionNo,
         string vnp_TransactionStatus,
         string vnp_TxnRef,
         string vnp_SecureHash
            )
        { 
            try
            {
                if (vnp_TransactionStatus == "00")
                {
                    Payment payment = await _paymentRepository.GetByIdAsync(Int32.Parse( vnp_TxnRef));
                    payment.PaymentStatus = "Thanh Toán Thành công";
                    var listbock = _bookingRepository.GetAll().Result.Where(e => e.PaymentID == payment.PaymentID).ToList();
                    await _paymentRepository.UpdateAsync(payment);
                    await _paymentRepository.SaveChangesAsync();

                    var bookingInfo = await _paymentRepository.BookingInfo(Int32.Parse(vnp_TxnRef));
                    var user = await _userManager.FindByIdAsync(bookingInfo.UserId);
                    var html = $@"<!DOCTYPE html>
                    <html lang=""en"">
                    <head>
                      <meta charset=""UTF-8"">
                      <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                      <title>Ticket Information</title>
                      <style>
                        body {{
                          font-family: Arial, sans-serif;
                          margin: 0;
                          padding: 0;
                        }}
                        .container {{
                          max-width: 600px;
                          margin: auto;
                          border: 1px solid #ccc;
                          padding: 20px;
                        }}
                        .header {{
                          font-size: 24px;
                          font-weight: bold;
                          margin-bottom: 20px;
                        }}
                        .location {{
                          font-style: italic;
                          margin-bottom: 20px;
                        }}
                        .reservation-code {{
                          font-weight: bold;
                          margin-bottom: 10px;
                          text-align:center;
                        }}
                        .ticket-code{{
                          text-align: center;
                          margin-bottom: 10px;
                        }}
                        .session {{
                          margin-bottom: 20px;
                          text-align: center;
                        }}
                        .qr-code {{
                          text-align: center;
                          margin-top: 20px;
                        }}
                        .info {{
                          margin-bottom: 20px;
                        }}
                        .column {{
                          display: flex;
                          justify-content: space-between;
                          margin-bottom: 10px;
                        }}
                        .label {{
                          font-weight: bold;
                        }}
                      </style>
                    </head>
                    <body>
                      <div class=""container"">
                        <div class=""header"">{bookingInfo.MovieName}</div>
                        <div class=""location"">
                          {bookingInfo.CinemaName}<br>
                          Tầng 4 Lotte Mall West Lake Hanoi, 683 đường Lạc Long Quân, Tây Hồ, Hà Nội, Hanoi, Vietnam
                        </div>
                        <div class=""reservation-code"">MÃ VÉ (RESERVATION CODE)</div>
                        <div class=""ticket-code"">{bookingInfo.TicketCode}</div>
                        <div class=""session"">
                          SUẤT CHIẾU (SESSION)<br>
                          {bookingInfo.ShowDate} {bookingInfo.StartTime}
                        </div>
                        <div class=""qr-code"">
                          <!-- Thêm hình ảnh QR code -->
                          <img src=""https://api.qrserver.com/v1/create-qr-code/?data={bookingInfo.TicketCode}&amp;size=100x100"" alt=""QR Code"">
                        </div>
                        <div class=""info"">
                          <div class=""column"">
                            <div class=""label"">Phòng chiếu: </div>
                            <div>
                              {bookingInfo.TheaterName}
                            </div>
                          </div>
                          <div class=""column"">
                            <div class=""label"">Ghế: </div>
                            <div> {bookingInfo.SeatNames}</div>
                            </div>
                          </div>
                          <div class=""column"">
                            <div class=""label"">Thời gian thanh toán: </div>
                            <div>
                              {bookingInfo.PaymentDate}
                            </div>
                          </div>
                          <div class=""column"">
                            <div class=""label"">Tiền combo bỏng nước: </div>
                            <div>0 VND</div>
                          </div>
                          <div class=""column"">
                            <div class=""label"">Tổng tiền: </div>
                            <div>0 VND</div>
                          </div>
                          <div class=""column"">
                            <div class=""label"">Số tiền giảm giá: </div>
                            <div>0 VND</div>
                          </div>
                          <div class=""column"">
                            <div class=""label"">Số tiền thanh toán: </div>
                            <div> {bookingInfo.Amount} VND</div>
                          </div>
                        </div>
                        <div class=""note"">
                          <p><strong>Lưu ý / Note:</strong></p>
                          <p>Vé đã mua không thể hủy, đổi hoặc trả lại. Vui lòng liên hệ Ban Quản Lý rạp hoặc tra cứu thông tin tại mục Điều khoản mua và sử dụng vé xem phim để biết thêm chi tiết. Cảm ơn bạn đã lựa chọn mua vé qua Ứng dụng Ví điện tử. Chúc bạn xem phim vui vẻ!</p>
                          <p><em>The successful movie ticket cannot be canceled, exchanged or refunded. If you have any question or problems with this order, you can contact Theater Manager or see our Conditon to purchase an use movie tickets for more infomation. Thanks you for choosing Ứng dụng Ví điện tử and Enjoy the movie!</em></p>
                        </div>
                      </div>
                    </body>
                    </html>";
                    await _mailService.SendEmailAsync(user.Email, "Xác nhận Email", html);

                }
                else 
                {
                    Payment payment = await _paymentRepository.GetByIdAsync(Int32.Parse(vnp_TxnRef));
                    var listbock=_bookingRepository.GetAll().Result.Where(e=>e.PaymentID==payment.PaymentID).ToList();

                    listbock.ForEach(async e =>
                    {
                        await _bookingRepository.DeleteAsync(e);
                        await _bookingRepository.SaveChangesAsync();
                    });
                   
                    await _paymentRepository.DeleteAsync(payment);
                    await _paymentRepository.SaveChangesAsync();
                    
                }
                    return Redirect($"http://localhost:5173/thanks?vnp_TransactionStatus=" + vnp_TransactionStatus + "&&vnp_TxnRef="+ vnp_TxnRef);
            }
            catch (Exception ex)
            {
                return Redirect($"http://localhost:5173/thanks?vnp_TransactionStatus=" + vnp_TransactionStatus + "&&vnp_TxnRef=" + vnp_TxnRef);
            }
        }
        [Route("Tickets")]
        [HttpGet]
        public async Task<IActionResult> GetListTicket([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? filter = "")
        {
            var ticketList = await _paymentRepository.GetTicketsInfo(page, pageSize, filter);
            if (ticketList == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No ticket in database");
            }
            return StatusCode(StatusCodes.Status200OK, ticketList);
        }
        [Route("TicketDetail")]
        [HttpPost]
        public async Task<IActionResult> GetTicketDetail(TicketVm ticketVm)
        {
            var ticket = await _paymentRepository.BookingInfo(ticketVm.PaymentID);
            if (ticket == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No ticket in database");
            }

            var result = new Response<BookingInfoResultVm>
            {
                Data = ticket,
                Code = StatusCodes.Status200OK,
                Status = Status.Success,
                Message = "Ok"
            };
            return Ok(result);
        }
    }
}
