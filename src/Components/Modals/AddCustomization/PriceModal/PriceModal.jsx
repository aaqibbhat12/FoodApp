import React, { useState } from 'react';
import styles from '../PriceModal/PriceModal.module.css';
import axios from 'axios';
import BASE_URI from '../../../../uri.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PriceModal = ({ id, isOpen, onClose, title }) => {
  const [isChecked, setIsChecked] = useState(false); // Track the checkbox state
  const navigate = useNavigate();

  // Fetch token and handle authentication
  // useEffect(() => {
  //   if (!isOpen) return;
  //   const token = localStorage.getItem('authToken');
  //   console.log("Token:", token); // Debugging: check the token value
  //   if (!token) {
  //     toast.error('Please login to get access to titles');
  //     navigate('/signup');
  //   }
  // }, [isOpen, navigate]);


  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleAddClick = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to get access to titles');
      navigate('/signup');
      return;
    }

    const data = {
      title_name: title,
      make_price_option: isChecked,
    };

    try {
      const response = await axios.post(
        `${BASE_URI}/api/items/customisation/addTitle/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      if (response.status === 200) {
       
        toast.success('Title added successfully');
        onClose();
      } else {
        
        if (response.data && response.data.message) {
          toast.error(response.data.message); // Display error message from backend
        } else {
          toast.error('Error occurred while adding title');
        }
      }
    } catch (error) {
      console.error('Error posting titles:', error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Display specific backend error message
      } else {
        toast.error('Error posting title');
      }
    }
  };

  
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.size}>
          {title} <span onClick={onClose}>x</span>
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isChecked}
            onChange={handleCheckboxChange} 
          />
          <span>Make {title} as price</span>
        </div>
        <div className={styles.button}>
          <button onClick={handleAddClick}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default PriceModal;
