import React from "react";
import styles from "../CustomizationsModal/CustomizationModal.module.css";

const CustomizationModal = ({ isOpen, onClose, customizations, itemName, quantity, price }) => {
  if (!isOpen) return null;

  // Handle "X" button click to close modal
  const handleClick = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.topdiv}>
          <div className={styles.buttondiv}>
            <button>{itemName || "Item Name"}</button>
          </div>
          <div className={styles.cross} onClick={handleClick}>
            X
          </div>
        </div>
        <div className={styles.secondmaindiv}>
          <button className={styles.button1}>{quantity || 1}</button>
          <button className={styles.button2}>Rs. {price || "0.00"}</button>
        </div>
        <div className={styles.items}>
          {customizations && Object.keys(customizations).length > 0 ? (
            Object.keys(customizations).map((customizationKey, index) => {
              const customization = customizations[customizationKey];
              return (
                <div key={index} className={styles.customizationGroup}>
                  <span className={styles.textspan}>{customization.title}:</span>
                  <ul>
                    {Array.isArray(customization.options) && customization.options.length > 0 ? (
                      customization.options.map((option, idx) => (
                        <li key={idx}>
                          {option.option_name} <span className={styles.RSspan}>Rs {option.additional_price}</span>
                        </li>
                      ))
                    ) : (
                      <li>No options available</li>
                    )}
                  </ul>
                </div>
              );
            })
          ) : (
            <div className={styles.customizationavailable}>No customizations available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
