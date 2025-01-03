import React, { useEffect, useState } from "react";
import styles from "../Dashboard/Dashboard.module.css";
import momoimg from '../../assets/Images/momo.png';
import DashboardChart from "../../Components/Charts/DashboardCharts.jsx";
import { useSelector } from "react-redux";
import BASE_URI from "../../uri.config.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [period, setPeriod] = useState("day"); // State for selected period (day, week, month, year)
  const [revenueData, setRevenueData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [mainData, setMainData] = useState({}); // State for mainData
  const [mapData, setMapData] = useState([]); // State for map-related data
  const dates = useSelector((state) => state.date.dates); // Fetch dates from Redux
  const navigate = useNavigate();
  

  // Format date to the required static format "YYYY-MM-DD"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  console.log(BASE_URI)
  // Generate labels based on the period (day, week, month, year)
  const generateLabels = (period) => {
    const currentDate = new Date();
    let labels = [];

    if (period === "day") {
      for (let i = 1; i <= 24; i += 4) {
        labels.push(`${i}:00`);
      }
    } else if (period === "week") {
      const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      labels = daysOfWeek;
    } else if (period === "month") {
      const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(i.toString());
      }
    } else if (period === "year") {
      const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      labels = monthsOfYear;
    }

    return labels;
  };

  // Calculate the start and end dates based on the selected period
  const calculateDateRange = (period) => {
    const currentDate = new Date();
    const dateFromState = dates['/'] ? new Date(dates['/']) : currentDate;
    let startDate = new Date(dateFromState);
    let endDate = new Date(dateFromState);
  
    if (period === "day") {
      const formattedDate = formatDate(currentDate);
      startDate = `${formattedDate} 00:00:00`;
      endDate = `${formattedDate} 23:59:59`;
    } else if (period === "week") {
      const dayOfWeek = currentDate.getDay();
      startDate.setDate(currentDate.getDate() - dayOfWeek);
      endDate.setDate(currentDate.getDate() + (6 - dayOfWeek));
      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);
      startDate = `${formattedStart} 00:00:00`;
      endDate = `${formattedEnd} 23:59:59`;
    } else if (period === "month") {
      startDate.setDate(1);
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);
      startDate = `${formattedStart} 00:00:00`;
      endDate = `${formattedEnd} 23:59:59`;
    } else if (period === "year") {
      startDate.setMonth(0, 1);
      endDate.setMonth(11, 31);
      const formattedStart = formatDate(startDate);
      const formattedEnd = formatDate(endDate);
      startDate = `${formattedStart} 00:00:00`;
      endDate = `${formattedEnd} 23:59:59`;
    }
  
    return { startDate, endDate };
  };
  
  // Fetch data for the selected period
  const fetchData = async (period) => {
    const { startDate, endDate } = calculateDateRange(period);

    // Log startDate and endDate for debugging
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("You are not logged in. Please login to get access.");
      navigate("/signup");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URI}/api/restaurant/sellerDashboard`, {
        params: {
          period: period,
          start_date: startDate,  // Static time for start date
          end_date: endDate,      // Static time for end date
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the response data for debugging
      console.log(response);

      const { graphData, mainData } = response.data.data;

      const revenue = graphData.map(item => parseFloat(item.totalRevenue));
      const orders = graphData.map(item => item.totalOrders);
      const labels = generateLabels(period);

      // Prepare data for the map (can be customized further)
      const mapData = graphData.map(item => ({
        date: item.date,
        totalOrders: item.totalOrders,
        totalRevenue: item.totalRevenue,
      }));

      // Set the main data in state
      setMainData(mainData);

      setRevenueData(revenue);
      setOrdersData(orders);
      setLabels(labels);
      setMapData(mapData); // Store map data in state

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data.");
    }
  };

  useEffect(() => {
    fetchData(period);
  }, [period]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };



const mostOrders = async()=>{
  const token= localStorage.getItem("authToken")
  if(!token){
    toast.error("you are not logged in please login to get access")
    navigate("/signup")
  }
  else{
    try {
      const response = await axios.get(`${BASE_URI}/api/restaurant/sellerMostOrderedItems`)
      
   console.log(response) 
    } catch (error) {
      console.log("some error ", error)
    }
  }
 

}

mostOrders()





  return (
    <div className={styles.container}>
      <div className={styles.divcontainer}>
        <div className={styles.totalIncomeContainer}>
          <p className={styles.totalincome}>Total Income</p>
          <p className={styles.amount}>Rs: {mainData?.totalIncome?.totalIncome}</p>
          <p className={styles.percentage}>{mainData?.totalIncome?.growthRate}</p>
        </div>
        <div className={styles.totalIncomeContainer}>
          <p className={styles.ordersPerDay}>Orders Per Day</p>
          <p className={styles.totalOrders}>{mainData?.ordersToday?.ordersToday}</p>
          <p className={styles.totalPercentage}>{mainData?.ordersToday?.growthRate}</p>
        </div>
        <div className={styles.totalIncomeContainer}>
          <p className={styles.todaysIncome}>Today's Income</p>
          <p className={styles.todaysAmount}>{mainData?.incomeToday?.incomeToday}</p>
          <p className={styles.todaysPercentage}>{mainData?.incomeToday?.growthRate}</p>
        </div>
        <div className={styles.totalIncomeContainer}>
          <p className={styles.averageSales}>Average Sales</p>
          <p className={styles.averageAmount}>{mainData?.averageSales?.averageSales}</p>
          <p className={styles.averagePercentage}>{mainData?.averageSales?.growthRate}</p>
        </div>
      </div>

      <div className={styles.graphsContainer}>
        <div className={styles.dropdown}>
          <select name="dropdown" id="1" value={period} onChange={handlePeriodChange}>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="day">Day</option>
          </select>
        </div>
        <div className={styles.graphsdiv}>
          <div className={styles.graph1}>
            <DashboardChart title="Revenue" dataPoints={revenueData} labels={labels} />
          </div>
          <div className={styles.graph2}>
            <DashboardChart title="Orders" dataPoints={ordersData} labels={labels} />
          </div>
        </div>
        <div className={styles.mostOrderscontainer}>
          <div className={styles.mostOrders}>
            <p>Most Ordered</p>
            <div className={styles.contentContainer}>
              <div className={styles.content}>
                <div className={styles.img}>
                  <img src={momoimg} alt="momo" />
                </div>
                <div className={styles.textdiv}>
                  <span>Momos</span>
                  <span>Ordered 50+ times</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.outofStock}>
            <p>Out of Stock</p>
            <div className={styles.contentContainer}>
              <div className={styles.content}>
                <div className={styles.img}>
                  <img src={momoimg} alt="momo" />
                </div>
                <div className={styles.textdiv}>
                  <span>Spring Rolls</span>
                  <span>Sold out</span>
                </div>
              </div>
            </div>
            </div>
            </div>
      </div>
   
    </div>
  );
};

export default Dashboard;
