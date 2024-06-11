using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Models.UserModel
{
    public class ChangePasswordVm
    {
        public string Email { get; set; } // Email của người dùng cần thay đổi mật khẩu
        public string CurrentPassword { get; set; } // Mật khẩu hiện tại của người dùng
        public string NewPassword { get; set; } 
        public string ConfirmPassword { get; set; }
    }
}
