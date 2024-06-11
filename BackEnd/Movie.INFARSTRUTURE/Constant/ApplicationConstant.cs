using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Movie.INFARSTRUTURE.Constant
{
    public class ApplicationConstant
    {
        public const string DOMAIN_WEB = "http://localhost:5173";

        public const string STATUS_SEAT_NORMAL = "Normal";
        public const string STATUS_SEAT_VIP = "Vip";

        public const int PRICE_NORMAL = 50000;
        public const int PRICE_VIP = 80000;
    }
    public class DescriptionAttribute : Attribute
    {
        public string Description { get; }

        public DescriptionAttribute(string description)
        {
            Description = description;
        }
    }
    public enum ErrorCode
    {
        [Description("Tên đăng nhập hoặc mật khẩu không đúng")]
        Error101 = 101,

        [Description("Người dùng đã tồn tại!")]
        Error102 = 102,

        [Description("Email đã được sử dụng!")]
        Error103 = 103,

        [Description("Không tìm thấy người dùng")]
        Error104 = 104,

        [Description("Email không thể xác nhận")]
        Error105 = 105,
        [Description("Đã tồn tại đủ 50 ghế")]
        Error106 = 106,
        [Description("Email chưa được confirm")]
        Error107 = 107,
        [Description("Email không tồn tại")]
        Error108 = 108,
        [Description("Lỗi khi đổi mật khẩu")]
        Error109 = 109,
        [Description("Mật khẩu hiện tại không đúng")]
        Error110 = 110,
        [Description("Mật khẩu mới không khớp với mật khẩu xác nhận")]
        Error111 = 111,
        [Description("Người dùng chưa mua vé xem phim này")]
        Error112 = 112

    }
}
