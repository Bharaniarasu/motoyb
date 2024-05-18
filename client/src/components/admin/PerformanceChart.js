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
      type: "string",
      min: 0,
      max: 16,
      stepSize: 20,
    },
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
const PerformanceChart = ({ performanceReport }) => {
  //Label
  const labels = ["user1", "user2", "user3", "user4", "user5"];

  // Function to check if a user exists in the dataset
  const finishedUerExists = (user) => {
    return performanceReport.finishedReport.some((item) => item.user === user);
  };

  // Function to get the count for a user or return 0 if user doesn't exist
  const getCountForFinishedUser = (user) => {
    const userData = performanceReport.finishedReport.find(
      (item) => item.user === user
    );
    return userData ? userData.count : 0;
  };
  // Function to check if a user exists in the dataset
  const pendingUserExists = (user) => {
    return performanceReport.pendingReport.some((item) => item.user === user);
  };

  // Function to get the count for a user or return 0 if user doesn't exist
  const getCountForPendingUser = (user) => {
    const userData = performanceReport.pendingReport.find(
      (item) => item.user === user
    );
    return userData ? userData.count : 0;
  };
  //Chart Data
  const data = {
    labels,
    datasets: [
      {
        label: "Assebled Report",
        data: labels.map((user) =>
          finishedUerExists(user) ? getCountForFinishedUser(user) : 0
        ),
        borderColor: "#2865ac",
        backgroundColor: "#FFF",
        pointStyle: "rectRounded",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
      {
        label: "Pending Report",
        data: labels.map((user) =>
          pendingUserExists(user) ? getCountForPendingUser(user) : 0
        ),
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

export default PerformanceChart;
