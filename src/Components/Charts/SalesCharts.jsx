import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const SalesCharts = ({ title, dataPoints, labels }) => {
  const data = {
    labels, // X-axis labels
    datasets: [
      {
        label: title, // Tooltip label
        data: dataPoints, // Y-axis data
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "transparent",
        tension: 0.4, // Smooth curve
        pointRadius: 2, // Visible points
        pointHoverRadius: 4, // Enlarged hover points
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable default aspect ratio
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            const labelIndex = tooltipItems[0]?.dataIndex;
            return labels[labelIndex]; // Show corresponding label
          },
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `Value: ${value}`; // Show exact value
          },
        },
      },
      legend: {
        display: false, // Hide legend
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // White-colored ticks
          padding: 10,
        },
        grid: {
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true,
          color: "rgba(255, 255, 255, 0.2)",
        },
        border: {
          color: "white", // White-colored x-axis line
        },
      },
      y: {
        ticks: {
          color: "white", // White-colored ticks
          padding: 10,
          callback: (value) => `${value}k`, // Format Y-axis values
        },
        grid: {
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true,
          color: "rgba(255, 255, 255, 0.2)",
        },
        border: {
          color: "white", // White-colored y-axis line
        },
        min: 0,
        max: Math.max(...dataPoints) + 10, // Dynamically adjust Y-axis range
      },
    },
  };

  return (
    <div style={{ height: "240px", width: "100%", position: "relative", top:"-20px" } }>
      <h3
        style={{
          color: "rgba(255, 255, 255, 1)",
          marginBottom: "10px",
          textAlign: "right",
          fontSize: "20px",
          position: "relative",
          top:"40px",
          right:"30px"
          
        }}
      >
        {title}
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesCharts;
