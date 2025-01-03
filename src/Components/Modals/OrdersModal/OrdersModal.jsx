import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../OrdersModal/OrdersModal.module.css";
import CustomizationModal from "../CustomizationsModal/CustomizationModal";
import BASE_URI from "../../../uri.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const OrdersModal = ({ id, isOpen, onClose }) => {
  const [isCustomizationModalOpen, setCustomizationModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();


  const openCustomizationModal = (item) => {
    setSelectedItem(item);
    setCustomizationModalOpen(true);
  };

  const closeCustomizationModal = () => {
    setCustomizationModalOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You are not logged in. Please login to access.");
      navigate("/signup");
      return;
    }

    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URI}/api/orders/getRestaurantOrderDetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderData(response.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchOrderData();
  }, [id, isOpen, navigate]);

  const handleOrderAction = async (type) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You are not logged in. Please login to access.");
      navigate("/signup");
      return;
    }

    try {
      const response = await axios.patch(
        `${BASE_URI}/api/restaurant/orderAcception?order_id=${id}&type=${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(`Order has been ${type === "confirm" ? "accepted" : "rejected"}`);
        onClose(); // Close the modal after successful API call
      }
    } catch (error) {
      console.error("Error handling order action", error);
      toast.error("Failed to update order status. Please try again.");
    }
  };

  if (!isOpen || !orderData) return null;

  const { order_details, items } = orderData;

  return (
    <>
      <CustomizationModal
        isOpen={isCustomizationModalOpen}
        onClose={closeCustomizationModal}
        customizations={selectedItem?.customizations || {}}
        itemName={selectedItem?.item_name}
        quantity={selectedItem?.quantity}
        price={selectedItem?.item_price}
      />

      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} 
        >
          <div className={styles.newOrder}>
            <span>New Order</span>
          </div>
          <div className={styles.mainorderdiv}>
            <div className={styles.Order}>
              <span className={styles.idspan}>
                Order Id: <span>{order_details.id}</span>
              </span>
              <span className={styles.dayspan}>
                {new Date(order_details.created_at).toDateString()} <br />
                <span>{new Date(order_details.created_at).toLocaleTimeString()}</span>
              </span>
            </div>
          </div>

          <div className={styles.OrderDetailsText}>Order Details</div>
          <div className={styles.mainOrderDetails}>
            {items.map((item) => (
              <div key={item.order_item_id} className={styles.OrderDetails}>
                <div className={styles.pizza}>{item.item_name}</div>
                <div className={styles.quantity}>{item.quantity}</div>
                <div className={styles.rupese}>Rs. {item.item_price}</div>
                <div
                  className={styles.customization}
                  onClick={() => openCustomizationModal(item)}
                >
                  View Customization
                </div>
              </div>
            ))}
          </div>

          <div className={styles.deliverDetailsText}>Delivery Details</div>
          <div className={styles.maindeviveryDiv}>
            <div className={styles.DeliveryDetails}>
              <div className={styles.From}>From</div>
              <div className={styles.Address}>
                {order_details.restaurant_street}
                <p>{order_details.restaurant_city}</p>
              </div>
            </div>
            <div className={styles.DeliveryDetails}>
              <div className={styles.From}>To</div>
              <div className={styles.Address}>
                {order_details.user_house_no}
                <p>{order_details.user_area}</p>
              </div>
            </div>
          </div>

          <div className={styles.mainPaymentDetais}>
            <div className={styles.PaymentDetailsText}>Payment Details</div>
            <div className={styles.PaymentDetails}>
              <div className={styles.Paid}>To be Paid</div>
              <div className={styles.Type}>{order_details.payment_type}</div>
            </div>
          </div>

          <div className={styles.buttonsdiv}>
            <button
              className={styles.rejectbutton}
              onClick={() => handleOrderAction("cancel")}
            >
              Reject
            </button>
            <button
              className={styles.acceptbutton}
              onClick={() => handleOrderAction("confirm")}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersModal;
