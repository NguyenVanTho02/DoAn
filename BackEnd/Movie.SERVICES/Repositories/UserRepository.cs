using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Movie.INFARSTRUTURE;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.UserModel;
using Movie.INFARSTRUTURE.Utilities;
using Movie.SERVICES.Interfaces;
using Movie.SERVICES.Interfaces.IRepositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Movie.SERVICES.Repositories
{
    public class UserRepository : GenericRipository<INFARSTRUTURE.Entities.ApplicationUser>, IUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private IMapper _mapper;
        public UserRepository(UserManager<ApplicationUser> userManager, IConfiguration configuration, ApplicationDbContext context, IUnitOfWork unitOfWork, IMapper mapper) : base(context, unitOfWork)
        {
            this._userManager = userManager;
            this._configuration = configuration;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookingHistoryResult>> BookingHistory(string email)
        {
            var userInfo = await _userManager.FindByEmailAsync(email);
            var userID = userInfo.Id;
            var query = from user in _context.Users
                        join payment in _context.Payments on user.Id equals payment.UserID
                        join show in _context.Shows on payment.ShowID equals show.ShowID
                        join movie in _context.Movies on show.MovieID equals movie.MovieID
                        join theater in _context.Theaters on show.TheaterID equals theater.TheaterID
                        join cinema in _context.Cinemas on theater.CinemaID equals cinema.CinemaID
                        where payment.UserID == userID
                        select new BookingHistoryResult
                        {
                            MovieName = movie.MovieName,
                            NumberOfTicket = payment.NumberOfTicket,
                            TicketCode = payment.TicketCode,
                            Poster = movie.Poster,
                            ShowDate = show.ShowDate,
                            StartTime = show.StartTime,
                            Age = movie.Age,
                            Duration = movie.Duration,
                            PaymentDate = payment.PaymentDate,
                            CinemaName = cinema.CinemaName,
                            TheaterName = theater.TheaterName,
                            PaymentID = payment.PaymentID,
                            SeatName = payment.PaymentInfo,
                            Amount = payment.Amount
                        };
            return await query.ToListAsync();
        }

        public async Task<PageList<UserResultVm>> GetListUser(int current, int pageSize, string filter = "")
        {
            var query = _context.Users.AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(u => u.UserName.Contains(filter));
            }
            var totalCount = query.Count();
            var totalPage = (int)Math.Ceiling((double)totalCount / pageSize);
            query = query.Skip((current - 1) * pageSize).Take(pageSize);
            var users = await query.ToListAsync();
            var resultItems = _mapper.Map<IEnumerable<UserResultVm>>(users);
            var result = PageList<UserResultVm>.Create(resultItems, current, pageSize, totalCount, totalPage);
            return result;
        }

        public async Task<UserResultVm> GetUserByUserName(string userName = "")
        {
            var infoUser = _context.Users.FirstOrDefault(u => u.UserName == userName);
            var result = _mapper.Map<UserResultVm>(infoUser);
            return result;
        }

        public async Task<string> SignInAsync(LoginViewModel login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email,user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
                var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            return null;
        }
        public async Task<IdentityResult> SignUpAsync(ApplicationUser user)
        {
            var result = await _userManager.CreateAsync(user, user.PasswordHash);
            return result;
        }

    }
}
