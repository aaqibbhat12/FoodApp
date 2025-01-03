import React, { useEffect, useState } from "react";
import styles from "../Orders/Orders.module.css";
import icon from "../../assets/Images/icon.png";
import group from "../../assets/Images/Group (1).png";
import Vector from "../../assets/Images/Vector (17).png";
import Vector1 from "../../assets/Images/Vector (16).png";
import axios from "axios";
import BASE_URI from "../../uri.config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrdersModal from "../../Components/Modals/OrdersModal/OrdersModal";

const Orders = () => {
  const [isModalOpen, setModalOpen] = useState(false);  
  const closeModal = () => setModalOpen(false);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [counts, setCounts] = useState({
    activeOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [orderID, setOrderID] = useState(null)
  const date = useSelector((state) => state.date.dates["/orders"]);
  console.log(date)


  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Please log in to access your orders.");
      navigate("/signup");
    } else {
      fetchOrders(token);
    }
  }, [navigate]);

  const fetchOrders = async (token) => {
    try {
      const response = await axios.get(`${BASE_URI}/api/orders/restaurantOrders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { date },
      });

      if (response.data.status === "success") {
        const { counts, orders } = response.data.data;
        setCounts(counts);
        setOrders(orders);
        // console.log("Orders fetched successfully:", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModalFunction = (id) =>{
    setOrderID(id);
    console.log("ultra",id);
    setModalOpen(true);
  }

  return (
    <>
    <OrdersModal id={orderID} isOpen={isModalOpen} onClose={closeModal} />
    <div className={styles.container}>
      {/* Order Summary */}
      <div className={styles.topdivs}>
        <div className={styles.activeOrders}>
          <div className={styles.activeOrdersContent}>
            <img src={icon} alt="icon" />
            <span>Active Orders</span>
          </div>
          <p className={styles.totallActives}>{counts.activeOrders}</p>
        </div>
        <div className={styles.pendingOrders}>
          <div className={styles.pendingOrdersContent}>
            <img src={group} alt="group" />
            <span>Pending Orders</span>
          </div>
          <p className={styles.totallPendings}>{counts.pendingOrders}</p>
        </div>
        <div className={styles.completedOrders}>
          <div className={styles.conmpletedOrdersContent}>
            <img src={Vector} alt="vector" />
            <img src={Vector1} alt="vector" className={styles.smallimage} />
            <span>Completed Orders</span>
          </div>
          <p className={styles.totallCompletes}>{counts.completedOrders}</p>
        </div>
      </div>

      {/* Orders Table */}
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
          <tbody >
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id} onClick={()=>openModalFunction(order.id)}>
                  <td>{index + 1}</td>
                  <td className={`${styles.status} ${styles[order.order_status.toLowerCase()]}`}>
                    {order.order_status}
                  </td>
                  <td>{new Date(order.created_at).toLocaleTimeString()}</td>
                  <td>{order.user_name} </td>
                  <td>₹{order.res_amount}</td>
                  <td>{order.delivery_boy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.noOrders}>
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Orders;
