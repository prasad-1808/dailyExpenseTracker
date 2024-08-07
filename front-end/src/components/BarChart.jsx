// BarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((expense) => new Date(expense.date).toLocaleDateString()),
    datasets: [
      {
        label: "Expenses",
        data: data.map((expense) => expense.amount),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Expenses by Date",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
