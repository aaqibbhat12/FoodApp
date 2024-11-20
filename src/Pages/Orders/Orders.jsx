import React from "react";
import styles from "../Orders/Orders.module.css";
import icon from "../../assets/Images/icon.png";
import group from '../../assets/Images/Group (1).png'
import Vector from '../../assets/Images/Vector (17).png'
import Vector1 from '../../assets/Images/Vector (16).png'

const Orders = () => {
  const tableData = [
    { orderNo: "1", status: "Active", eta: "30 min", customerName: "John Doe", amount: "₹150", deliveryPartner: "DHL" },
    { orderNo: "2", status: "Pending", eta: "15 min", customerName: "Jane Smith", amount: "₹200", deliveryPartner: "FedEx" },
    { orderNo: "3", status: "Completed", eta: "0 min", customerName: "Alice Brown", amount: "₹300", deliveryPartner: "UPS" },
    { orderNo: "4", status: "Active", eta: "45 min", customerName: "John Smith", amount: "₹400", deliveryPartner: "DHL" },
    { orderNo: "5", status: "Pending", eta: "20 min", customerName: "Mary Doe", amount: "₹250", deliveryPartner: "FedEx" },
    { orderNo: "1", status: "Active", eta: "30 min", customerName: "John Doe", amount: "₹150", deliveryPartner: "DHL" },
    { orderNo: "2", status: "Pending", eta: "15 min", customerName: "Jane Smith", amount: "₹200", deliveryPartner: "FedEx" },
    { orderNo: "3", status: "Completed", eta: "0 min", customerName: "Alice Brown", amount: "₹300", deliveryPartner: "UPS" },
    { orderNo: "4", status: "Active", eta: "45 min", customerName: "John Smith", amount: "₹400", deliveryPartner: "DHL" },
    { orderNo: "5", status: "Pending", eta: "20 min", customerName: "Mary Doe", amount: "₹250", deliveryPartner: "FedEx" },
    { orderNo: "1", status: "Active", eta: "30 min", customerName: "John Doe", amount: "₹150", deliveryPartner: "DHL" },
    { orderNo: "2", status: "Pending", eta: "15 min", customerName: "Jane Smith", amount: "₹200", deliveryPartner: "FedEx" },
    { orderNo: "3", status: "Completed", eta: "0 min", customerName: "Alice Brown", amount: "₹300", deliveryPartner: "UPS" },
    { orderNo: "4", status: "Active", eta: "45 min", customerName: "John Smith", amount: "₹400", deliveryPartner: "DHL" },
    { orderNo: "5", status: "Pending", eta: "20 min", customerName: "Mary Doe", amount: "₹250", deliveryPartner: "FedEx" },
    { orderNo: "1", status: "Active", eta: "30 min", customerName: "John Doe", amount: "₹150", deliveryPartner: "DHL" },
    { orderNo: "2", status: "Pending", eta: "15 min", customerName: "Jane Smith", amount: "₹200", deliveryPartner: "FedEx" },
    { orderNo: "3", status: "Completed", eta: "0 min", customerName: "Alice Brown", amount: "₹300", deliveryPartner: "UPS" },
    { orderNo: "4", status: "Active", eta: "45 min", customerName: "John Smith", amount: "₹400", deliveryPartner: "DHL" },
    { orderNo: "5", status: "Pending", eta: "20 min", customerName: "Mary Doe", amount: "₹250", deliveryPartner: "FedEx" },
    { orderNo: "1", status: "Active", eta: "30 min", customerName: "John Doe", amount: "₹150", deliveryPartner: "DHL" },
    { orderNo: "2", status: "Pending", eta: "15 min", customerName: "Jane Smith", amount: "₹200", deliveryPartner: "FedEx" },
    { orderNo: "3", status: "Completed", eta: "0 min", customerName: "Alice Brown", amount: "₹300", deliveryPartner: "UPS" },
    { orderNo: "4", status: "Active", eta: "45 min", customerName: "John Smith", amount: "₹400", deliveryPartner: "DHL" },
    { orderNo: "5", status: "Pending", eta: "20 min", customerName: "Mary Doe", amount: "₹250", deliveryPartner: "FedEx" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.topdivs}>
      <div className={styles.activeOrders}>
  <div className={styles.activeOrdersContent}>
    <img src={icon} alt="icon" />
    <span>Active Orders</span>
  </div>
  <p className={styles.totallActives}>7</p>
</div>
<div className={styles.pendingOrders}>
  <div className={styles.pendingOrdersContent}>
    <img src={group} alt="group" />
    <span>Pending Orders</span>
  </div>
  <p className={styles.totallPendings}>7</p>
</div>
<div className={styles.completedOrders}>
  <div className={styles.conmpletedOrdersContent}>
    <img src={Vector} alt="vector" />
    <img src={Vector1} alt="vector" className={styles.smallimage} />
    <span>Completed Orders</span>
  </div>
  <p className={styles.totallCompletes}>7</p>
</div>
      </div>
      <div className={styles.tablecontainer}>
        <table>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Status</th>
              <th>ETA</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Delivery Partner</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.orderNo}</td>
                <td className={`${styles.status} ${styles[data.status.toLowerCase()]}`}>
                  {data.status}
                </td>
                <td>{data.eta}</td>
                <td>{data.customerName}</td>
                <td>{data.amount}</td>
                <td>{data.deliveryPartner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
