using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Movie.INFARSTRUTURE.Constant;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.MailModel;
using Movie.INFARSTRUTURE.Models.UserModel;
using Movie.SERVICES.Interfaces.IRepositories;
using MovieApi.Extensions;
using MovieApi.Helpers;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.Ocsp;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Encodings.Web;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Security.Claims;
using MediatR;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMailService _mailService;
        private IUserRepository _userRepository;
        private IMapper _mapper;
        public UserController(IUserRepository userRepository, SignInManager<ApplicationUser> signInManager, IMapper mapper, UserManager<ApplicationUser> userManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager, IMailService mailService)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _mapper = mapper;
            _configuration = configuration;
            _roleManager = roleManager;
            _mailService = mailService;
            _signInManager = signInManager;
        }
        [Route("SignIn")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)ErrorCode.Error101, Message = "Email or password incorect" });
            }
            if (!user.EmailConfirmed)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)ErrorCode.Error107, Message = "Email not confirmed" });
            }
            var resultData = await _userRepository.SignInAsync(request);
            if (string.IsNullOrEmpty(resultData))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)ErrorCode.Error101, Message = "Email or password incorect" });
            }

            var result = new Response<string>()
            {
                Data = resultData,
                Status = 100,
                Code = StatusCodes.Status200OK,
                Message = "Login success"

            };
            return Ok(result);
        }
        [Route("SignUp")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel request)
        {
            var userNameExists = await _userManager.FindByNameAsync(request.Username);
            if (userNameExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)ErrorCode.Error102, Message = "UserName already exists!" });
            var userEmailExists = await _userManager.FindByEmailAsync(request.Email);
            if (userEmailExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)ErrorCode.Error103, Message = "Email already exists!" });
            var user = new ApplicationUser
            {
                Email = request.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = request.Username,
            };
            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = Status.Error, Message = "User creation failed! Please check user details and try again." });
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            //var ConfirmationLink = Url.Action("ConfirmEmail", "Account",new { UserId = user.Id, Token = token }, protocol: HttpContext.Request.Scheme);
            var confirmationLink = $"{ApplicationConstant.DOMAIN_WEB}/confirm-email?userId={user.Id}&token={token}";
            var emailContent = $"Please confirm your account by <a href=`{confirmationLink}`>clicking here</a>.";

            await _mailService.SendEmailAsync(user.Email, "Xác nhận Email", emailContent);
            if (!await _roleManager.RoleExistsAsync(AppRole.Admin))
            {
                await _roleManager.CreateAsync(new IdentityRole(AppRole.Admin));

            }
            if (!await _roleManager.RoleExistsAsync(AppRole.Customer))
            {
                await _roleManager.CreateAsync(new IdentityRole(AppRole.Customer));

            }
            await _userManager.AddToRoleAsync(user, AppRole.Customer);
            return Ok(new Response { Status = Status.Success, Message = "User created successfully!" });

        }
        [Route("ConfirmEmail")]
        [HttpPost]
        public async Task<IActionResult> ConfirmEmail(ConfirmMailVm mailVm)
        {
            var user = await _userManager.FindByIdAsync(mailVm.UserId);
            if (user == null)
            {
                return Ok(new Response { Status = (int)ErrorCode.Error104, Message = "User not found!" });
            }
            var result = await _userManager.ConfirmEmailAsync(user, mailVm.Token);
            if (result.Succeeded)
            {
                return Ok(new Response { Status = Status.Success, Message = "Confirm succsees!" });

            }
            return Ok(new Response { Status = (int)ErrorCode.Error105, Message = "Email cannot be confirmed!" });

        }
        //[AllowAnonymous]
        //public IActionResult GoogleLogin()
        //{
        //    string redirectUrl = Url.Action("")
        //}

        [Route("Users")]
        [HttpGet]
        public async Task<IActionResult> GetListUser([FromQuery] int current = 1, [FromQuery] int pageSize = 20, [FromQuery] string? filter = "")
        {
            var listUser = await _userRepository.GetListUser(current, pageSize, filter);
            if (listUser == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No user in database");
            }
            return StatusCode(StatusCodes.Status200OK, listUser);
        }

        [Route("{username}")]
        [HttpGet]
        public async Task<IActionResult> GetInfoUser(string? username)
        {
            var user = await _userRepository.GetUserByUserName(username);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, "No user in database");
            }
            return StatusCode(StatusCodes.Status200OK, user);
        }

        [Route("UpdateUser")]
        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserResultVm userVM)
        {
            var user = await _userManager.FindByIdAsync(userVM.id);
            if (user == null)
            {
                return NotFound(new Response
                {
                    Status = Status.Error,
                    Code = StatusCodes.Status204NoContent,
                    Message = "No user in database"
                });
            }
            var userData = _mapper.Map(userVM, user);
            await _userRepository.UpdateAsync(userData);
            var result = new Response
            {
                Status = Status.Success,
                Code = StatusCodes.Status200OK,
                Message = "Update user success"
            };
            return Ok(result);
        }
        [Route("BookingHistory")]
        [HttpPost]
        public async Task<IActionResult> BookingHistory(BookingHistoryVm booking)
        {
            var bookinghistory = await _userRepository.BookingHistory(booking.Email);
            var result = new Response<IEnumerable<BookingHistoryResult>>
            {
                Data = bookinghistory,
                Status = 200,
                Code = StatusCodes.Status200OK,
                Message = "Get booking history success"
            };
            return Ok(result);

        }
        private string GenerateRandomStrongPassword()
        {
            const string validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
            var random = new Random();
            var password = new StringBuilder();
            for (int i = 0; i < 10; i++)
            {
                password.Append(validChars[random.Next(validChars.Length)]);
            }
            return password.ToString();
        }
        [Route("ForgotPassword")]
        [HttpPost]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordVm passwordVm)
        {
            var user = await _userManager.FindByEmailAsync(passwordVm.Email);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)ErrorCode.Error108, Message = "Email không tồn tại" });

            }
            var passwordNew = GenerateRandomStrongPassword();
            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            await _userManager.ResetPasswordAsync(user, resetToken, passwordNew);
            await _userManager.UpdateAsync(user);
            var emailContent = $"Mật khẩu mới:{passwordNew}";
            await _mailService.SendEmailAsync(user.Email, "[MDCinemas] Khôi phục mật khầu khách hàng", emailContent);
            var result = new Response
            {
                Status = Status.Success,
                Code = StatusCodes.Status200OK,
                Message = "Update user success"
            };
            return Ok(result);
        }
        [Route("ChangePassword")]
        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordVm changePasswordVm)
        {
            if (changePasswordVm.NewPassword != changePasswordVm.ConfirmPassword)
            {
                return BadRequest(new Response { Status = (int)ErrorCode.Error111, Message = "Mật khẩu mới không khớp với mật khẩu xác nhận." });
            }
            var user = await _userManager.FindByEmailAsync(changePasswordVm.Email);
            if (user == null)
            {
                return NotFound(new Response { Status = (int)ErrorCode.Error108, Message = "Không tìm thấy người dùng với email này." });
            }

            // Kiểm tra mật khẩu hiện tại
            var passwordValid = await _userManager.CheckPasswordAsync(user, changePasswordVm.CurrentPassword);
            if (!passwordValid)
            {
                return BadRequest(new Response { Status = (int)ErrorCode.Error110, Message = "Mật khẩu hiện tại không đúng." });
            }

            // Thay đổi mật khẩu
            var changeResult = await _userManager.ChangePasswordAsync(user, changePasswordVm.CurrentPassword, changePasswordVm.NewPassword);
            if (!changeResult.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)ErrorCode.Error109, Message = "Lỗi khi thay đổi mật khẩu." });
            }

            return Ok(new Response { Status = Status.Success, Code = StatusCodes.Status200OK, Message = "Mật khẩu của người dùng đã được thay đổi thành công." });
        }
        [HttpPost("googlelogin")]
        public IActionResult OnPost()
        {
            /* HttpContext.Request.Headers.AccessControlAllowOrigin = "http://localhost:5173";
             HttpContext.Response.Headers.AccessControlAllowOrigin = "http://localhost:5173";*/

            string redirectUrl = $"https://localhost:43999/api/User/callback";

            var properties = _signInManager.ConfigureExternalAuthenticationProperties("Google", redirectUrl);

            return new ChallengeResult("Google", properties);
        }
        [HttpGet("callback")]


        public async Task<IActionResult> ExternalLoginCallback()
        {

            var info = await _signInManager.GetExternalLoginInfoAsync();
            var data = (ClaimsIdentity)info.Principal.Identity;
            var clami = data.Claims.ToList();
            var user = new ApplicationUser
            {
                Email = clami.Where(e => e.Type == ClaimTypes.Email).Select(e => e.Value).FirstOrDefault(),
                NormalizedEmail = clami.Where(e => e.Type == ClaimTypes.Email).Select(e => e.Value).FirstOrDefault().ToUpper(),
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = clami.Where(e => e.Type == ClaimTypes.Name).Select(e => e.Value).FirstOrDefault(),
            };
            var userNameExistslist = await _userRepository.GetAll();

            var userNameExists = userNameExistslist.Where(e => e.Email == user.Email).FirstOrDefault();
            if (userNameExists == null)
            {

                await _userRepository.CreateAsync(user);
                await _userRepository.SaveChangesAsync();

            }
            var userNew = await _userManager.FindByEmailAsync(user.Email);
            var authClaims = new List<Claim>
             {
                    new Claim(ClaimTypes.NameIdentifier, userNew.Id),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email,user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };


            authClaims.Add(new Claim(ClaimTypes.Role, "customer"));

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );
            string tokendata = new JwtSecurityTokenHandler().WriteToken(token);

            var result = new Response<string>()
            {
                Data = tokendata,
                Status = 100,
                Code = StatusCodes.Status200OK,
                Message = "Login success"

            };
            HttpContext.Response.Cookies.Append("token", tokendata);
            HttpContext.Response.Cookies.Append("userId", userNew.Id);
            HttpContext.Response.Cookies.Append("userName", clami.Where(e => e.Type == ClaimTypes.Name).Select(e => e.Value).FirstOrDefault());
            HttpContext.Response.Cookies.Append("userRole", "customer");
            HttpContext.Response.Cookies.Append("userEmail", clami.Where(e => e.Type == ClaimTypes.Email).Select(e => e.Value).FirstOrDefault());
            return Redirect($"http://localhost:5173/");

        }
    }
}
