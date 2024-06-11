import { NavLink } from "react-router-dom";
import IconProfile from "../../../components/icons/IconProfile";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ViewListIcon from '@mui/icons-material/ViewList';
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HomeIcon from "@mui/icons-material/Home";
const sidebarLinks = [
  {
    icon: <HomeIcon></HomeIcon>,
    title: "Trang chủ",
    url: "/admin/dashboard",
  },
  {
    icon: <LiveTvOutlinedIcon></LiveTvOutlinedIcon>,
    title: "Quản lý phim",
    url: "/admin/movie-manage",
  },
  {
    icon: <ViewListIcon></ViewListIcon>,
    title: "Quản lý vé đã đặt",
    url: "/admin/ticket-manage",
  }, 
  {
    icon: <TheatersOutlinedIcon></TheatersOutlinedIcon>,
    title: "Quản lý rạp",
    url: "/admin/cinema-manage",
  },
  {
    icon: <TheatersOutlinedIcon></TheatersOutlinedIcon>,
    title: "Quản lý phòng chiếu",
    url: "/admin/theater-manage",
  },
  {
    icon: <CalendarMonthOutlinedIcon></CalendarMonthOutlinedIcon>,
    title: "Quản lý suất chiếu",
    url: "/admin/show-manage",
  },
  {
    icon: <ScheduleOutlinedIcon></ScheduleOutlinedIcon>,
    title: "Quản lý ghế của rạp",
    url: "/admin/seat-manage",
  },
  {
    icon: <NewspaperIcon></NewspaperIcon>,
    title: "Quản lý bài viết",
    url: "/admin/post-manage",
  },
  {
    icon: <IconProfile></IconProfile>,
    title: "Quản lý người dùng",
    url: "/admin/user-manage",
  },

];
const NavBar = () => {
  const navlinkClass =
    "flex items-center p-5 gap-x-5  md:h-12  md:rounded-lg md:mb-4";
  return (
    <div className="w-full md:w-[300px] h-screen bg-[white] shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] px-[14px] py-10 flex flex-col flex-shrink-0">
      {sidebarLinks.map((link) => {
        if (link.url === "/logout") {
          return (
            <button
              className={`${navlinkClass} text-icon-color`}
              key={link.title}
              onClick={() => {
                window.location.reload();
              }}
            >
              <span>{link.icon}</span>
              <span>{link.title}</span>
            </button>
          );
        }
        return (
          <NavLink
            to={link.url}
            key={link.title}
            className={({ isActive }) =>
              isActive
                ? `${navlinkClass} text-[#1976d2] bg-[#1976d2] bg-opacity-20`
                : `${navlinkClass} text-icon-color hover:bg-[#1976d2] hover:bg-opacity-20 hover:text-[#1976d2]`
            }
          >
            <span>{link.icon}</span>
            <span>{link.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavBar;
