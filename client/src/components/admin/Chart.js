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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Assemble Progress",
    },
  },
  scales: {
    y: {
      type: "linear",
      min: 0,
      max: 16,
      stepSize: 20,
    },
  },
};
// Get date values from the array

const formatDate = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthNames[date.getMonth()];
  return `${month} ${day}`;
};
const Chart = ({ tasksData }) => {
  //Label
  const labels = tasksData.finishedReport.map((item) => formatDate(item.date));
  //Chart Data
  const data = {
    labels,
    datasets: [
      {
        label: "Assebled Report",
        data: tasksData.finishedReport.map((item) => item.assembleCount),
        borderColor: "#2865ac",
        backgroundColor: "#FFF",
        pointStyle: "rectRounded",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
      {
        label: "Pending Report",
        data: tasksData.pendingReport.map((item) => item.pendingCount),
        borderColor: "#FF574A",
        backgroundColor: "#FFF",
        pointStyle: "rectRounded",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  };
  return <Line options={options} data={data} className="p-8" />;
};

export default Chart;
