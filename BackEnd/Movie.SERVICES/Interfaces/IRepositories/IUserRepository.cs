using Microsoft.AspNetCore.Identity;
using Movie.INFARSTRUTURE.Entities;
using Movie.INFARSTRUTURE.Models.UserModel;
using Movie.INFARSTRUTURE.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Movie.SERVICES.Interfaces.IRepositories
{
    public interface IUserRepository : IGenericRepository<ApplicationUser>
    {
        Task<string> SignInAsync(LoginViewModel login);
        Task<IdentityResult> SignUpAsync(ApplicationUser register);
        public Task<PageList<UserResultVm>> GetListUser(int current, int pageSize, string filter = "");
        public Task<UserResultVm> GetUserByUserName(string userName);
        public Task<IEnumerable<BookingHistoryResult>> BookingHistory(string email);
    }
}
