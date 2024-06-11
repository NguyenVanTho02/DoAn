import React from "react";
import "./home.scss";
import ChartRevenue from "./ChartRevenue";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChairIcon from "@mui/icons-material/Chair";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const HomeAdmin = () => {
  return (
    <div className="h-full !rounded-none !overflow-visible m-[40px]">
      <div className="grid grid-cols-4 gap-8">
        <div className="item-statistical">
          <p className="m-[15px] font-bold">Doanh số</p>
          <div className="flex ml-[15px] items-center">
            <div className="w-[40px] h-[40px] bg-[#c4f1d4] flex items-center justify-center rounded-full mr-3">
              <AttachMoneyIcon className="text-[#44af69]" />
            </div>
            <p className="text-[22px] ">1.920.000.000</p>
            <p className="text-[22px] ml-2 ">VND</p>
          </div>
        </div>
        <div className="item-statistical">
          <p className="m-[15px] font-bold">Số ghế đã đặt</p>
          <div className="flex ml-[15px] items-center">
            <div className="w-[40px] h-[40px] bg-[#f3cbc9] flex items-center justify-center rounded-full mr-3">
              <ChairIcon className="text-[#d3432f]" />
            </div>
            <p className="text-[22px] ">35</p>
            <p className="text-[22px] ml-2 ">ghế</p>
          </div>
        </div>
        <div className="item-statistical">
          <p className="m-[15px] font-bold">Số lượng phim đang chiếu</p>
          <div className="flex ml-[15px] items-center">
            <div className="w-[40px] h-[40px] bg-[#f40d1f] flex items-center justify-center rounded-full mr-3">
              <LiveTvIcon className="text-[#fff]" />
            </div>
            <p className="text-[22px] ">10</p>
            <p className="text-[22px] ml-2 ">phim</p>
          </div>
        </div>
        <div className="item-statistical">
          <p className="m-[15px] font-bold">Số lượng phim sắp chiếu</p>
          <div className="flex ml-[15px] items-center">
            <div className="w-[40px] h-[40px] bg-[#99c5e5] flex items-center justify-center rounded-full mr-3">
              <HourglassTopIcon className="text-[#fff]" />
            </div>
            <p className="text-[22px] ">35</p>
            <p className="text-[22px] ml-2 ">phim</p>
          </div>
        </div>
      </div>

      <div className="mt-[50px]">
        <ChartRevenue />
      </div>
    </div>
  );
};

export default HomeAdmin;
