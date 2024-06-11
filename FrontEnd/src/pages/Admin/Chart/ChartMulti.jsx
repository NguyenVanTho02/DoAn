import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { getRevenueByDayOfMonth } from "../../services/function";
import { useDispatch } from "react-redux";
import { reportService } from "../../../services/ReportService";
import exporExcel from "../../../util/exportExcel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Biểu đồ doanh thu và số vé bán ra theo ngày",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};
const ChartMulti = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [dataExcel, setDataExcel] = useState([]);
  const dispatch = useDispatch();
  const [day, setDay] = useState([]);
  const [numberOfTickets, setNumberOfTickets] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };
  const data = {
    labels: day,
    datasets: [
      {
        label: "Doanh thu",
        data: revenue,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Số vé",
        data: numberOfTickets,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      const revenueVm = {
        year: year,
        month: month,
      };
      try {
        const result = await reportService.getRevenueByDayOfMonth(revenueVm);
        const data = result.data.data;
        console.log("data", data);
        setDataExcel(data);
        setDay(data.map((item) => item.day));
        setRevenue(data.map((item) => item.revenue));
        setNumberOfTickets(data.map((item) => item.numberOfTickets));
      } catch {
        console.log("error");
      }
    };
    fetchData();
  }, [year, month]);

  // const exporExcel = (data, nameSheet, nameFile) => {
  //   return new Promise((resolve, reject) => {
  //     var wb = XLSX.utils.book_new();
  //     var ws = XLSX.utils.json_to_sheet(data);
  //     XLSX.utils.book_append_sheet(wb, ws, nameSheet);
  //     XLSX.writeFile(wb, `${nameFile}.xlsx`);
  //     resolve("OK");
  //   });
  // };

  const costumDataExcel = (data) => {
    let result = [];
    data.map((item) =>
      result.push({
        Day: item.day,
        Revenue: item.revenue,
        NumberOfTickets: item.numberOfTickets,
      })
    );
    return result;
  };

  const handleExportExcel = () => {
    exporExcel(
      costumDataExcel(dataExcel),
      `Bảng thống kê tháng ${month} - ${year}`,
      `ThongKe${month}-${year}`
    );
  };

  return (
    <div className="m-auto w-3/4">
      <div className="flex gap-4">
        <div className="flex items-center">
          <label className="text-lg mr-2">Chọn năm:</label>
          <select
            className="bg-gray-200 p-2 rounded-md"
            defaultValue={currentYear}
            onChange={handleChangeYear}
          >
            <option value={currentYear - 1}>{currentYear - 1}</option>
            <option value={currentYear}>{currentYear}</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="text-lg mr-2">Chọn tháng:</label>
          <select
            className="bg-gray-200 p-2 rounded-md"
            defaultValue={currentMonth}
            onChange={handleChangeMonth}
          >
            {Array.from({ length: 12 }, (_, index) => {
              const monthNumber = index + 1;
              return (
                <option key={monthNumber} value={monthNumber}>
                  Tháng {monthNumber}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <Line data={data} options={options} />
      <button
        className="w-[100px] h-[40px] bg-[#1976d2] text-[#fff] rounded my-[30px]"
        onClick={handleExportExcel}
      >
        Xuất excel
      </button>
    </div>
  );
};

export default ChartMulti;
