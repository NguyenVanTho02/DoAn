import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white border-t border-[#ccc]">
      <div className="grid grid-cols-12 max-w-[1120px] mx-auto my-[40px] gap-5">
        <div className="col-span-4">
          <h1 className="uppercase text-[#1976d2] text-[22px]">
            Công ty cổ phần THO Cinema
          </h1>
          <p className="text-justify my-[20px] text-[#333]">
            Giấy chứng nhận ĐKKD số: 01******6789 - Đăng ký lần đầu ngày
            01/04/2024 tại Sở Kế hoạch và Đầu tư Thành phố Hà Nội
          </p>
          <p className="mb-[5px] flex items-center text-[#333]">
            <LocationOnIcon className="mr-[10px] text-red-500" />
            19 Ngõ 130, Hồ Tùng Mâu, Cầu Giấy, Hà Nội
          </p>
          <p className="mb-[5px] flex items-center text-[#333]">
            <PhoneEnabledIcon className="mr-[10px] text-green-500" />
            0983666789
          </p>
          <p className="mb-[5px] flex items-center text-[#333]">
            <MailOutlineIcon className="mr-[10px] text-red-500" />
            mtcinema@gmail.com
          </p>
        </div>
        <div className="col-span-2">
          <h1 className="uppercase text-[22px]">Về chúng tôi</h1>
          <ul className="mt-[20px]">
            <li className="mb-[10px] text-[#333] hover:underline ">
              <Link>Trang chủ</Link>
            </li>
            <li className="mb-[10px] text-[#333] hover:underline">
              <Link>Giới thiệu</Link>
            </li>
            <li className="mb-[10px] text-[#333] hover:underline">
              <Link>Tuyển dụng</Link>
            </li>
            <li className="mb-[10px] text-[#333] hover:underline">
              <Link>F.A.Q</Link>
            </li>
            <li className="mb-[10px] text-[#333] hover:underline">
              <Link>Hoạt động xã hội</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2">
          <h1 className="uppercase text-[22px]">Hỗ trợ</h1>
          <ul className="mt-[20px]">
            <li className="mb-[10px] text-[#333] hover:underline ">
              <Link>Liên hệ</Link>
            </li>
            <li className="mb-[10px] text-[#333] hover:underline">
              <Link>Điều khoản sử dụng</Link>
            </li>
            <li className="mb-[10px] text-[#333] hover:underline">
              <Link>Chính sách thanh toán, đổi trả - hoàn vé</Link>
            </li>
            <li className="mb-[10px] text-[#333] hover:underline">
              <Link>Liên hệ quảng cáo</Link>
            </li>
            <li className="mb-[10px] text-[#333] hover:underline">
              <Link>Điều khoản bảo mật</Link>
            </li>
            <li className="mb-[10px] text-[#333] hover:underline">
              <Link>Hướng dẫn đặt vé online</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-4">
          <h1 className="uppercase text-[22px]">Liên hệ</h1>
          <div className="mt-[20px]">
            <FacebookIcon className="text-[60px] text-blue-600 mr-3" />
            <XIcon className="text-[60px]  mr-3" />
            <TelegramIcon className="text-[60px] text-blue-600 mr-3" />
            <MailOutlineIcon className="text-[60px] text-red-500 mr-3" />
          </div>
          <div className="mt-[40px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9440796406648!2d105.76644818158785!3d21.03492340092447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b91d1d5e75%3A0x2b706ee46fab3821!2sHD%20Mon%20City!5e0!3m2!1svi!2s!4v1713893857708!5m2!1svi!2s"
              className="w-full h-[200px]"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
