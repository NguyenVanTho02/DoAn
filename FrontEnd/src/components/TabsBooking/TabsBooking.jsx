import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const TabsBooking = ({ show }) => {
  const [value, setValue] = React.useState("1");
  const [showData, setShowData] = React.useState();
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getWeekday(dateString) {
    const date = new Date(dateString);
    const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return weekdays[date.getDay()];
  }
  useEffect(() => {
    const currentTime = new Date();
    const data = Object.values(show);
    console.log("data",data);

    const filteredShows = data.filter((show) => {
      const showDate = new Date(show.showDate);
      const year = showDate.getFullYear();
      const month = (showDate.getMonth() + 1).toString().padStart(2, "0");
      const day = showDate.getDate().toString().padStart(2, "0");
      const showDateISO = `${year}-${month}-${day}`;
      const startTime = new Date(`${showDateISO}T${show.startTime}`);
      return (
        showDate > currentTime ||
        (showDate.toDateString() === currentTime.toDateString() &&
          startTime > currentTime)
      );
    });

    const showsByDate = {};
    filteredShows.forEach((show) => {
      const date = show.showDate.split("T")[0];
      if (!showsByDate[date]) {
        showsByDate[date] = [];
      }
      showsByDate[date].push(show);
    });
    const formattedData = Object.keys(showsByDate).map((date) => ({
      date: date,
      show: showsByDate[date],
    }));
    console.log("formattedData", formattedData);
    setShowData(formattedData);
  }, [show]);
  const handleBookshow = (showID) => {
    if(localStorage.getItem('token')===null){
      toast.error("Bạn vui lòng đăng nhập");
      navigate("/sign-in");
      return;
    }
    navigate(`/book-tickets/${showID}`);
  };
  return (
    <Box
      sx={{ width: "100%", typography: "body1" }}
      className="max-w-[1120px] mx-auto"
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="">
            {showData?.map((day, index) => (
              <Tab
                key={index}
                label={
                  <p className="text-lg">
                    <span className="text-4xl">{day.date.slice(8)}</span>/
                    {day.date.slice(5).slice(0, 2)} - {getWeekday(day.date)}
                  </p>
                }
                value={(index + 1).toString()}
              />
            ))}
          </TabList>
        </Box>
        {showData?.map((day, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            {day.show.map((showing, showIndex) => (
              <div
                key={showIndex + 1}
                onClick={() => {
                  handleBookshow(showing.showID);
                }}
                className="w-[114px] h-[30px] bg-gray-300 bg-cover text-gray-700 inline-block font-oswald text-sm grid-auto-rows auto leading-5 py-1 px-4 text-center uppercase cursor-pointer rounded-sm mr-8"
              >
                {showing.startTime}
              </div>
            ))}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
TabsBooking.propTypes = {
  show: PropTypes.object,
};
export default TabsBooking;
