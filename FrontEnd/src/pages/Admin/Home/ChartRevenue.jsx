import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

const ChartRevenue = () => {
  const [months, setMonths] = useState(6);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const sampleData = [1000, 1500, 1200, 1800, 2000, 19000, 20000];

  const data = {
    labels: Array.from({ length: months }, (_, i) => `Tháng ${i + 1}`),
    datasets: [
      {
        fill: true,
        label: "Doanh số",
        data: sampleData.slice(0, months),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        marginBottom: "20px",
      },
    ],
  };

  // Biểu đồ vé
  const dataSticket = {
    labels: ["Số ghế đã đặt", "Số ghế trống"],
    datasets: [
      {
        data: [12, 19],
        backgroundColor: ["#0092fb", "#fe0031"],
      },
    ],
  };

  return (
    <div className="">
      <div className="box-chart">
        <div className="option-month">
          <select
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((num) => (
              <option key={num} value={num}>
                {num} tháng
              </option>
            ))}
          </select>
        </div>
        <div className="h-[400px] mt-12 mx-[10px]">
          <Line options={options} data={data} />
        </div>
      </div>
      {/* <div className="box-ticket">
        <div className="h-[400px] mt-[20px] flex items-center justify-center">
          <Pie data={dataSticket} />
        </div>
      </div> */}
    </div>
  );
};

export default ChartRevenue;
