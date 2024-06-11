import React, { useEffect, useState } from "react";
import "./showtimesByTheater.scss";
import Header from "../../layouts/MainLayout/Header/Header";
import Footer from "../../layouts/MainLayout/Footer";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ItemMovieByCinema } from "../../components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { showService } from "../../services/ShowService";

const ShowtimesByTheater = () => {
  const [value, setValue] = React.useState("1");
  const [dataInit, setDataInit] = useState();
  const cinemaID = useSelector((state) => state.CinemaReducer);
  const handleListDay = () => {
    let currentDay = new Date();
    let dateInWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    let result = [];
    for (let i = 0; i < 4; i++) {
      let date = currentDay.getDate();
      let month = currentDay.getMonth() + 1;
      let day = currentDay.getDay();

      let dateNow = (date < 10 ? "0" : "") + date;
      let monthNow = (month < 10 ? "0" : "") + month;
      let dayInWeek = dateInWeek[day];

      result.push(dateNow + "/" + monthNow + " - " + dayInWeek);

      currentDay.setDate(currentDay.getDate() + 1);
    }
    return result;
  };

  let listDay = handleListDay();
  const handleChange = (event, newValue) => {
    setValue(newValue);

    const parts = newValue.split(" - "); // Tách chuỗi thành phần ngày và ngày trong tuần
    const datePart = parts[0]; // Phần ngày: "12/05"
    // Tách ngày và tháng từ phần ngày
    const [day, month] = datePart.split("/");
    const year = new Date().getFullYear(); // Sử dụng năm hiện tại
    // Tạo chuỗi ngày đầy đủ để chuyển đổi thành đối tượng Date
    const fullDateString = `${year}-${month}-${day}`;
    getData(fullDateString); // Gọi hàm getData() với ngày đã chọn khi người dùng thay đổi tab
  };
  const getData = async (selectedDay) => {
    try {
      const showVm = {
        cinemaID: cinemaID.cinemaID,
        showDate: selectedDay, // Truyền ngày đã chọn xuống API
      };
      const result = await showService.getMoviebyCinema(showVm);
      setDataInit(result.data.data);
    } catch (error) {
      toast.error("Lỗi! Không thể load dữ liệu");
    }
  };
  useEffect(() => {
    // Thiết lập giá trị mặc định cho tab đầu tiên
    setValue(listDay[0]);
    const parts = listDay[0].split(" - "); // Tách chuỗi thành phần ngày và ngày trong tuần
    const datePart = parts[0]; // Phần ngày: "12/05"
    // Tách ngày và tháng từ phần ngày
    const [day, month] = datePart.split("/");
    const year = new Date().getFullYear(); // Sử dụng năm hiện tại
    // Tạo chuỗi ngày đầy đủ để chuyển đổi thành đối tượng Date
    const fullDateString = `${year}-${month}-${day}`;
    // Gọi hàm getData() với ngày đầu tiên trong listDay khi component được mount
    getData(fullDateString);
  }, [cinemaID]);
  return (
    <div className="mt-[80px]">
      <Header />
      <Box
        sx={{ width: "100%", typography: "body1" }}
        className="max-w-[1120px] mx-auto"
      >
        <div></div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="">
              {listDay.map((item, index) => (
                <Tab
                  key={index}
                  label={
                    <p className="text-lg">
                      <span className="text-4xl">{item.slice(0, 2)}</span>
                      {item.slice(2)}
                    </p>
                  }
                  value={item}
                />
              ))}
            </TabList>
          </Box>
          {listDay.map((item, index) => (
            <TabPanel value={item} key={index}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-[70px]">
                {dataInit &&
                  dataInit.map((movie) => (
                    <ItemMovieByCinema key={movie.movieID} movie={movie} />
                  ))}
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
      <Footer />
    </div>
  );
};

export default ShowtimesByTheater;
