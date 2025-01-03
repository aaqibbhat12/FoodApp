import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../RestaurantDocs/RestaurantDocs.module.css';
import BASE_URI from '../../../uri.config'; // Make sure to import your BASE_URI
import Contract from '../RestaurantContract/Contract'; 
import { toast } from 'react-toastify';

const RestaurantDocs = () => {
  const [formData, setFormData] = useState({
    pan_no: '',
    GSTIN_no: '',
    FSSAI_no: '',
    outlet_type: '',
    bank_IFSC: '',
    bank_account_no: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

  useEffect(() => {
    // Check if user is authenticated using localStorage
    const userToken = localStorage.getItem('authToken');
    if (userToken) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
      toast.error("you need to login first")
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is authenticated before submitting
    if (!isAuthenticated) {
      toast.success('you must be logged in to sumit this form')
      return;
    }
console.log(formData)
    try {
      const response = await axios.post(`${BASE_URI}/api/restaurant/submitRestaurantDocs`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        }
      });
      console.log('Data submitted successfully:', response.data);
      setIsSubmitted(true); 
    } catch (error) {
      console.error('Error submitting data:', error);
     toast.error("Error submitting data")
    }
  };

  return (
    <div className={styles.container}>
      {isSubmitted ? (
        <Contract /> // Render the Contract component when form is submitted
      ) : (
        <div className={styles.leftrightmaindiv2}>
          <div className={styles.leftdiv2}>
            <div className={styles.outlettype}>
              <div className={styles.outletlabel}>
                <label htmlFor="outlet_type">Outlet Type</label>
              </div>
              <div className={styles.outloptions}>
                <select
                  id="outlet_type"
                  name="outlet_type"
                  className={styles.outletDropdown}
                  value={formData.outlet_type}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Cafe">Cafe</option>
                  <option value="Restaurant">Restaurant</option>
                </select>
              </div>

              <div className={styles.pannumber}>
                <div className={styles.labelpannumber}>
                  <label htmlFor="pan_no">Pan Number <span className={styles.star}>*</span></label>
                </div>
                <div className={styles.pannumberinput}>
                  <input
                    type="text"
                    id="pan_no"
                    name="pan_no"
                    placeholder="Enter Owner/business PAN"
                    value={formData.pan_no}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.GSTIN}>
                <div className={styles.labelgstin}>
                  <label htmlFor="GSTIN_no">GSTIN <span className={styles.star}>*</span></label>
                </div>
                <div className={styles.pannumberinput}>
                  <input
                    type="text"
                    id="GSTIN_no"
                    name="GSTIN_no"
                    placeholder="Enter GST Number"
                    value={formData.GSTIN_no}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightdiv2}>
            <div className={styles.BankAccount}>
              <div className={styles.BankAccountlabel}>
                <label htmlFor="bank_account_no">Bank Account <span className={styles.star}>*</span></label>
              </div>
              <div className={styles.BankAccountinput}>
                <input
                  type="text"
                  id="bank_account_no"
                  name="bank_account_no"
                  placeholder="Enter Bank Account Number"
                  value={formData.bank_account_no}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.BankIfsc}>
              <div className={styles.Ifsclabel}>
                <label htmlFor="bank_IFSC">Bank IFSC <span className={styles.star}>*</span></label>
              </div>
              <div className={styles.BankAccountinput}>
                <input
                  type="text"
                  id="bank_IFSC"
                  name="bank_IFSC"
                  placeholder="Enter Bank IFSC Code"
                  value={formData.bank_IFSC}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.Fssainumber}>
              <div className={styles.fssailabel}>
                <label htmlFor="FSSAI_no">FSSAI Number <span className={styles.star}>*</span></label>
              </div>
              <div className={styles.BankAccountinput}>
                <input
                  type="text"
                  id="FSSAI_no"
                  name="FSSAI_no"
                  placeholder="Enter FSSAI Certificate Number"
                  value={formData.FSSAI_no}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.buttons}>
        <div className={styles.buttoncancel}>
          <button type="button">Cancel</button>
        </div>
        <div className={styles.buttoncontinue}>
          <button type="submit" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDocs;
