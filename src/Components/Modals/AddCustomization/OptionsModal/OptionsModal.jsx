import React, { useState, useEffect } from 'react';
import styles from '../OptionsModal/OptionsModal.module.css';
import axios from 'axios';
import BASE_URI from '../../../../uri.config';
import { toast } from 'react-toastify';

const OptionsModal = ({ isOpen, onClose, id, titleId, editOptionData }) => {
  const [optionName, setOptionName] = useState('');
  const [optionPrice, setOptionPrice] = useState('');

  // Populate fields when editing an option
  useEffect(() => {
    if (editOptionData?.optionId) {
      setOptionName(editOptionData.optionName);
      setOptionPrice(editOptionData.optionPrice);
    } else {
      setOptionName('');
      setOptionPrice('');
    }
  }, [editOptionData]);

  // If the modal is not open, return null to hide it
  if (!isOpen) return null;

  const handleSave = async () => {
    if (!optionName || !optionPrice) {
      toast.error('Option name and price are required!');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found!');
        return;
      }

      if (editOptionData?.optionId) {
        // Update an existing option
        await axios.patch(
          `${BASE_URI}/api/items/customisation/editOptions/${editOptionData.optionId}`,
          { option_name: optionName, additional_price: optionPrice },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Option updated successfully');
      } else {
        // Add a new option
        await axios.post(
          `${BASE_URI}/api/items/customisation/addOption/${titleId}`,
          { option_name: optionName, additional_price: optionPrice },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Option added successfully');
      }

      onClose(); // Close modal after save
    } catch (error) {
      console.error('Error saving option:', error);
      toast.error('Error saving option!');
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <div className={styles.upperDiv}>
            <span className={styles.Text}>{editOptionData?.optionId ? 'Edit Option' : 'Add Option'}</span>
            <span onClick={onClose} className={styles.crossSpan}>x</span>
          </div>
          <div className={styles.bottomDiv}>
            <input
              type="text"
              className={styles.name}
              placeholder="Option name"
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
            />
            <input
              type="number"
              className={styles.price}
              placeholder="Option price"
              value={optionPrice}
              onChange={(e) => setOptionPrice(e.target.value)}
            />
          </div>
          <div className={styles.buttonDiv}>
            <button onClick={handleSave}>{editOptionData?.optionId ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;