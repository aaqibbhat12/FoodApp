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

const DashboardCharts = ({ title, dataPoints, labels }) => {
  const data = {
    labels, // X-axis labels
    datasets: [
      {
        label: title, // This is used for the tooltip
        data: dataPoints, // Y-axis data
        borderColor: "rgba(255, 255, 255, 1)", // Line color
        backgroundColor: "transparent", // No fill under the line
        tension: 0, // Smooth curve
        pointRadius: 1, // Make points more visible
        pointHoverRadius: 2, // Enlarge points on hover
        borderWidth: 2
      },
    ],
  };

  const options = { 
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index", // Show tooltip for the nearest point
        intersect: true, // Only trigger on the specific point
        callbacks: {
          title: (tooltipItems) => {
            // Show the day (label) as the title
            const labelIndex = tooltipItems[0]?.dataIndex;
            return labels[labelIndex];
          },
          label: (tooltipItem) => {
            // Show the revenue value
            const value = tooltipItem.raw;
            return title === "Revenue" ? `Revenue: ₹${value}` : `Value: ${value}`;
          },
        },
      },
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis tick label color
          padding: 10,
        },
        grid: {
          drawBorder: true, // Show X-axis line
          drawOnChartArea: false, // Hide grid lines
          drawTicks: false, // Keep tick marks
          color: "white", // Ensure grid color is consistent if used
        },
        border: {
          color: "white", // Make the X-axis line white
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis tick label color
          padding: 10,
          callback: (value) => {
            if (title === "Revenue") {
              return `${value / 1000}K`; // Format as 2K, 8K, etc.
            }
            return value; // Return raw value for other charts
          },
          stepSize: title === "Revenue" ? 8000 : 8, // Steps for labels
        },
        grid: {
          drawBorder: true, // Show Y-axis line
          drawOnChartArea: false, // Hide grid lines
          drawTicks: false, // Keep tick marks
          color: "white", // Ensure grid color is consistent if used
        },
        border: {
          color: "white", // Make the Y-axis line white
        },
        min: title === "Revenue" ? 2000 : 2, // Y-axis starts from 2K for Revenue, 2 for Orders
        max: title === "Revenue" ? 50000 : 50, // Y-axis ends at 50K for Revenue, 50 for Orders
      },
    },
  };

  return (
    <div>
      {/* Add the chart title above the chart */}
      <h3
        style={{
          color: "rgba(255, 255, 255, 1)",
          marginBottom: "5px",
          textAlign: "right",
        }}
      >
        {title}
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default DashboardCharts;
