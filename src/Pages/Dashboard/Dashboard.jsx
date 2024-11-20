import React from "react";
import styles from "../Dashboard/Dashboard.module.css";
import momoimg from '../../assets/Images/momo.png'
import DashboardChart from "../../Components/Charts/DashboardCharts.jsx";
 

const Dashboard = () => {
  // Data for Revenue Chart
  const revenueData = [2000, 4000, 12000, 20000, 28000, 50000];
  const ordersData = [2, 8, 12, 20, 28, 50];
  const labels = ["1 May", "5 May", "10 May", "15 May", "20 May", "25 May"];

  return (
    <div className={styles.container}>
      <div className={styles.divcontainer}>
      <div className={styles.totalIncomeContainer}>
        <p className={styles.totalincome}>Total Income</p>
        <p className={styles.amount}>Rs: 70,000 </p>
        <p className={styles.percentage}>+10%</p>
      </div>
      <div className={styles.totalIncomeContainer}>
        <p className={styles.ordersPerDay}>Orders Per Day</p>
        <p className={styles.totalOrders}>37</p>
        <p className={styles.totalPercentage}>+10%</p>
      </div>
      <div className={styles.totalIncomeContainer}>
        <p className={styles.todaysIncome}>Today's Income</p>
        <p className={styles.todaysAmount}>30000 </p>
        <p className={styles.todaysPercentage}>+10%</p>
      </div>
      <div className={styles.totalIncomeContainer}>
        <p className={styles.averageSales}>Average Sales</p>
        <p className={styles.averageAmount}>40% </p>
        <p className={styles.averagePercentage}>-2.5%</p>
      </div>
</div>
<div className={styles.graphsContainer}>
        <div className={styles.graph1}>
          <DashboardChart
            title="Revenue"
            dataPoints={revenueData}
            labels={labels}
          />
        </div>
        <div className={styles.graph2}>
          <DashboardChart
            title="Orders"
            dataPoints={ordersData}
            labels={labels}
          />
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
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={momoimg} alt="momo" />
            </div>
<div className={styles.textdiv}>
  <span>Momos</span> 
  <span>Ordered 50+ times</span>
</div>
          </div>

          <div className={styles.content}>
            <div className={styles.img}>
              <img src={momoimg} alt="momo" />
            </div>
<div className={styles.textdiv}>
  <span>Momos</span> 
  <span>Ordered 50+ times</span>
</div>
          </div>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={momoimg} alt="momo" />
            </div>
<div className={styles.textdiv}>
  <span>Momos</span> 
  <span>Ordered 50+ times</span>
</div>
          </div>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={momoimg} alt="momo" />
            </div>
<div className={styles.textdiv}>
  <span>Momos</span> 
  <span>Ordered 50+ times</span>
</div>
          </div>
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
  <span>Momos</span> 
  <span>0 units available</span>
</div>
          </div>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={momoimg} alt="momo" />
            </div>
<div className={styles.textdiv}>
  <span>Momos</span> 
  <span>1 units available</span>
</div>
          </div>

          <div className={styles.content}>
            <div className={styles.img}>
              <img src={momoimg} alt="momo" />
            </div>
<div className={styles.textdiv}>
  <span>Momos</span> 
  <span>2 units available</span>
</div>
          </div>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={momoimg} alt="momo" />
            </div>
<div className={styles.textdiv}>
  <span>Momos</span> 
  <span>0 units available</span>
</div>
          </div>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={momoimg} alt="momo" />
            </div>
<div className={styles.textdiv}>
  <span>Momos</span> 
  <span>0 units available</span>
</div>
          </div>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={momoimg} alt="momo" />
            </div>
<div className={styles.textdiv}>
  <span>Momos</span> 
  <span>0 units available</span>
</div>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
