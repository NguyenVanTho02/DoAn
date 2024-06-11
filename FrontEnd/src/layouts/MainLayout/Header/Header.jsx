import "./Header.scss";
import {
  AppBar,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOutAction } from "../../../redux/actions/AuthAction";
import { cityService } from "../../../services/CityService";
import { SELECT_CINEMA } from "../../../redux/constrants/Cinema";
import { Link } from "react-router-dom";
import pathRoute from "../../../util/pathRoute";

import Cookies from "js-cookie";
import { LOGIN_SUCCESS } from "../../../redux/constrants/Auth";
const headMenu = [
  {
    nameLink: "Lịch chiếu theo rạp",
    id: "lichchieutheorap",
    route: pathRoute.SHOWTIMESBYTHEATER,
  },
  {
    nameLink: "Phim",
    id: "phim",
    route: pathRoute.MOVIES,
  },
  {
    nameLink: "Rạp",
    id: "rap",
    route: pathRoute.CINEMA,
  },
  {
    nameLink: "Giá vé",
    id: "giave",
    route: pathRoute.PRICETICKET,
  },
  {
    nameLink: "Tin tức",
    id: "tintuc",
    route: pathRoute.NEWS,
  },
];
const Header = () => {
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const { cinemaName } = useSelector((state) => state.CinemaReducer);
  const [text, setText] = useState("Chọn rạp chiếu phim");
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get("token") != null) {
      var token = Cookies.get("token");
      localStorage.setItem("token", token);
      var user = {
        userId: Cookies.get("userId"),
        userName: Cookies.get("userName"),
        userRole: Cookies.get("userRole"),
        userEmail: Cookies.get("userEmail"),
      };
      dispatch(
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            data: user,
          },
        })
      );
      Cookies.remove("token");
    }
  }, []);

  const handleClick = (props) => {
    // Thay đổi state của text
    const { cinemaName, cinemaID } = props;
    setText(cinemaName);
    handleSelectCinema(props);
  };
  const toggleSubmenu = () => {
    setSubmenuVisible(!submenuVisible);
  };
  const handleLogin = () => {
    navigate("/sign-in");
  };
  const handleRegister = () => {
    navigate("/sign-in");
  };
  const handleLogOut = () => {
    dispatch(logOutAction());
  };
  const handldeUserInfo = () => {
    navigate("/user-info");
  };
  useEffect(() => {
    cityService
      .getListCinemaCity()
      .then((result) => {
        setMenu(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSelectCinema = (props) => {
    const { cinemaName, cinemaID } = props;
    dispatch({
      type: SELECT_CINEMA,
      payload: { cinemaID: cinemaID, cinemaName: cinemaName },
    });
  };
  return (
    <div className="root">
      <AppBar position="fixed" color="default" className="appBar">
        <Toolbar className="spaceBetween" sx={{ height: 72, fontSize: 18 }}>
          <div className="flex gap-x-64 items-center">
            <Link to={pathRoute.HOME} className="logo">
              <img
                src="/img/thocinema.png"
                alt="logo"
                style={{ height: 50, borderRadius: "5px" }}
              />
            </Link>
            <div className="menu-select-cinema">
              <button className="dropbtn bg-[#f9f9f9]">
                <span className="span1">{cinemaName}</span>
                <KeyboardArrowDownIcon className="icon" />
              </button>

              <div className={`dropdown-content`}>
                {menu.map((e) => (
                  <div key={e.cityID}>
                    <div className="sub-menu">
                      <button className="sub-menu-trigger">
                        <span className="span1">{e.cityName}</span>
                        <KeyboardArrowRightIcon className="icon" />
                      </button>
                      <div className="sub-menu-content">
                        {e.listCinema.map((item) => (
                          <a
                            key={item.cinemaID}
                            onClick={() =>
                              handleClick({
                                cinemaName: item.cinemaName,
                                cinemaID: item.cinemaID,
                              })
                            }
                          >
                            {item.cinemaName}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="linkTobody">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {headMenu.map((link) => (
                <Link to={link.route} key={link.id} className="link">
                  {link.nameLink}
                </Link>
              ))}
            </Grid>
          </div>
          <div className="user">
            {currentUser ? (
              <List disablePadding className="auth">
                <ListItem className="itemAuth divide" onClick={handldeUserInfo}>
                  <ListItemIcon className="iconLogin">
                    <Avatar className="avatar" src="/img/avatar.png"></Avatar>
                  </ListItemIcon>
                  <ListItemText primary={currentUser?.userName} />
                </ListItem>
                <ListItem onClick={handleLogOut} className="itemAuth">
                  <ListItemText primary="Đăng Xuất" />
                </ListItem>
              </List>
            ) : (
              <List disablePadding className="auth">
                <ListItem className="itemAuth divide" onClick={handleLogin}>
                  <ListItemIcon className="iconLogin">
                    <AccountCircleIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Đăng Nhập" />
                </ListItem>
                <ListItem className="itemAuth" onClick={handleRegister}>
                  <ListItemText primary="Đăng Ký" />
                </ListItem>
              </List>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
