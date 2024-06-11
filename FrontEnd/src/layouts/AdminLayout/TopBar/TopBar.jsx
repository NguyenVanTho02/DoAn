import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import InputIcon from "@mui/icons-material/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOutAction } from "../../../redux/actions/AuthAction";
import { useNavigate } from "react-router-dom";
const TopBar = () => {
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOutAction());
    navigate("/");
  };
  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <div style={{ cursor: "pointer" }}>
          <img
            src="/img/thocinema.png"
            alt="logo"
            style={{ height: 50 }}
            className="rounded-lg"
          />
        </div>

        {/* 1 thẻ div chiếm hết khoảng trống còn lại dể dồn các icon về 2 bên */}
        <Box flexGrow={1} />

        {/* cái icon chuông và đăng xuất */}
        <Hidden lgDown>
          <IconButton color="inherit" size="large">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Đăng xuất" onClick={handleLogout}>
            <IconButton color="inherit" size="large">
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>

        {/* cái icon menu */}
        {/* <Hidden lgUp>
            <IconButton
              color="inherit"
              // nếu click thì thực hiện func đóng mở Nav được truyền vào từ cha
             
              size="large">
              <MenuIcon />
            </IconButton>
          </Hidden> */}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
