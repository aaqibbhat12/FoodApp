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

const ReportsCharts = ({ title, dataPoints, labels }) => {
  const data = {
    labels, // X-axis labels
    datasets: [
      {
        label: title, // Tooltip label
        data: dataPoints, // Y-axis data
        borderColor: "rgba(255, 255, 255, 1)", 
        backgroundColor: "transparent", 
        tension: 0, // Smooth curve
        pointRadius: 0, // Visible points
        pointHoverRadius: 5, // Enlarged hover points
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable default aspect ratio
    aspectRatio: 2, // Set a custom aspect ratio (e.g., width / height)
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            const labelIndex = tooltipItems[0]?.dataIndex;
            return labels[labelIndex];
          },
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return title === "Sales" ? `Sales: ${value}` : `Value: ${value}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          padding: 10,
        },
        grid: {
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true,
          color: "white",
        },
        border: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
          padding: 10,
          callback: (value) => {
            // Display only the values in the dataPoints array
            return dataPoints.includes(value) ? value : null;
          },
        },
        grid: {
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true,
          color: "white",
        },
        border: {
          color: "white",
        },
        min: Math.min(...dataPoints), // Set the minimum value for Y-axis
        max: Math.max(...dataPoints), // Set the maximum value for Y-axis
      },
    },
  };

  return (
    <div style={{ height: "250px", width: "100%", position: "relatve" }}>
      <h3
        style={{
          color: "rgba(255, 255, 255, 1)",
          marginBottom: "0px",
          textAlign: "right",
          fontSize: "20px",
        }}
      >
        {title}
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default ReportsCharts;
