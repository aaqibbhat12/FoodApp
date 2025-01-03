import React, { useState } from "react";
import styles from "../../Pages/Reports/Reports.module.css";
import ReportsCharts from "../../Components/Charts/ReportsCharts";
import SalesCharts from "../../Components/Charts/SalesCharts"
import { useSelector } from "react-redux";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("reports"); // Track active tab state

  const salesData = [100, 200, 300, 400, 500]; // Y-axis values for Sales
  const SalesData=[10,20,30,40,50,60]
  const labels = ["1-May", "5-May", "10-May", "15-May", "20-May", "25-May", "30-May"]; // X-axis labels

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Change active tab
  };
  const date = useSelector((state) => state.date.dates)
  console.log(date)

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.topdiv}>
        <div className={styles.textdiv}>{activeTab === "reports" ? "Reports" : "Revenue"}</div>
        <div className={styles.reportsButtondiv}>
  <button
    className={`${styles.reportsButton} ${activeTab === "reports" ? styles.activeTab : ""}`}
    onClick={() => handleTabChange("reports")}
  >
    Reports
  </button>
  <button
    className={`${styles.revenueButton} ${activeTab === "revenue" ? styles.activeTab : ""}`}
    onClick={() => handleTabChange("revenue")}
  >
    Revenue
  </button>
</div>

        <div className={styles.date}>
          <input type="date" />
        </div>
      </div>

      {/* Graph Section */}
      <div className={styles.graphDiv}>
        <div className={styles.ReportsgraphsContainer}>
          <div className={styles.Reportsgraph1}>
            {activeTab === "reports" && (
              <ReportsCharts title="Sales" dataPoints={salesData} labels={labels} />
            )}
            {/* Add revenue chart or component here */}
            {activeTab === "revenue" && <div>
              
              <SalesCharts title="Sales"  dataPoints={SalesData} labels={labels}/>
              
              
              </div>}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomDiv}>
        {/* Left Section */}
        <div className={styles.leftDiv}>
          {activeTab === "reports" && (
            <>
              <div className={styles.orderstextdiv}>Orders</div>
              <div className={styles.receivedDiv}>
                <div className={styles.recieved}>Received</div>
                <span className={styles.receivedSpan}>500</span>
              </div>
              <div className={styles.completedDiv}>
                <div className={styles.completed}>Completed</div>
                <span className={styles.completedSpan}>500</span>
              </div>
              <div className={styles.canceledDiv}>
                <div className={styles.canceled}>Canceled</div>
                <span className={styles.canceledSpan}>500</span>
              </div>
            </>
          )}
          {activeTab === "revenue" && (
            <div className={styles.revenueDetails}>
              <div className={styles.Revenue}>Revenue</div>
              <div className={styles.onlinediv}>
              <div className={styles.Online}>Online</div>
              <span>70%</span>
              </div>
              <div className={styles.CashOnDeliverydiv}>
              <div className={styles.CashOnDelivery}>Cash On Delivery</div>
              <span>30%</span>
              </div> 
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className={styles.rightDiv}>
          {activeTab === "reports" ? (
            <div className={styles.circle}>
              <div className={styles.outerCircle}>
                <div className={styles.innerCircle}></div>
              </div>
            </div>
          ) : (
            <div className={styles.revenueCircle}>
              <div className={styles.revenueOuterCircle}>
                <div className={styles.revenueInnerCircle}></div>
              </div>
            </div>
          )}

          <div className={styles.colorLeftdiv}>
            {activeTab === "reports" ? (
              <>
                <div className={styles.recievedcolor}>
                  <div className={styles.redcolor}>
                    <div className={styles.color1}></div>
                    <span className={styles.receivedtext}>Received</span>
                  </div>
                </div>
                <div className={styles.completedcolor}>
                  <div className={styles.bluecolor}>
                    <div className={styles.color2}></div>
                    <span className={styles.completedtext}>Completed</span>
                  </div>
                </div>
                <div className={styles.canceledcolor}>
                  <div className={styles.greencolor}>
                    <div className={styles.color3}></div>
                    <span className={styles.canceledtext}>Canceled</span>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.revenueDiv}>
                {/* Placeholder for revenue-specific colors or other content */}
           <div className={styles.revenuedatacircle}>
            <div className={styles.outwordsCircle}>
               <div className={styles.inverdsCircle}></div>
            </div>
           </div>
           <div className={styles.revenueRepresentation}>
            <div className={styles.representationDiv1}>
              <div className={styles.divcolor1}></div>
              <div className={styles.div1}>Online</div>
            </div>
            <div className={styles.representationDiv2}>
              <div className={styles.divcolor2}></div>
              <div className={styles.div2}>Cash On Delivery</div>
            </div>
           
           
           </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
