import React, { useState } from 'react';
import styles from '../Restaurantinfo/restaurantInfo.module.css';
import AddressModal from '../../Modals/AddressModal/AddressModal';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BASE_URI from '../../../uri.config';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import RestaurantDocs from '../RestaurantDocs/RestaurantDocs';

const RestaurantInfo = ({ onNext, onCancel, onSubmit }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const [selectedDays, setSelectedDays] = useState(
    daysOfWeek.reduce((days, day) => ({ ...days, [day]: false }), {})
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pickupAddress = useSelector((state) => state.address);
  
  const location = useLocation();
  const addressData = location.state ? location.state.address : pickupAddress;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleSelectAll = () => {
    const allSelected = Object.values(selectedDays).every((day) => day);
    const newSelection = daysOfWeek.reduce((days, day) => {
      days[day] = !allSelected;
      return days;
    }, {});
    setSelectedDays(newSelection);
  };

  const handleDayChange = (day) => {
    setSelectedDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("No authentication token found!");
      return;
    }

    const workingDaysArray = Object.entries(selectedDays)
      .filter(([day, isSelected]) => isSelected)
      .map(([day]) => day);

    const formData = {
      restaurant_name: e.target.restaurantName.value,
      owner_name: e.target.ownerName.value,
      owner_email: e.target.ownerEmail.value,
      owner_phone_no: e.target.ownerPhone.value,
      area: addressData.area || '',
      city: addressData.city || '',
      street: addressData.street || '',
      landmark: addressData.landmark || '',
      state: addressData.state || '',
      pincode: addressData.pincode || '',
      latitude: addressData.latitude || '',
      longitude: addressData.longitude || '',
      monday: selectedDays['Monday'],
      tuesday: selectedDays['Tuesday'],
      wednesday: selectedDays['Wednesday'],
      thursday: selectedDays['Thursday'],
      friday: selectedDays['Friday'],
      saturday: selectedDays['Saturday'],
      sunday: selectedDays['Sunday'],
      opening_time: e.target.openingTime.value,
      closing_time: e.target.closingTime.value,
    };

    try {
      const response = await axios.post(
        `${BASE_URI}/api/restaurant/submitRestaurantInfo`, 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      console.log('Form submitted successfully:', response.data);
      toast.success("Form submitted successfully")
      setFormSubmitted(true);
      onSubmit(); // Change top navigation when form is submitted
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  if (formSubmitted) {
    return <RestaurantDocs />;
  }

  return (
    <>
      {isModalOpen && <AddressModal />}
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.leftrightmaindiv}>
            <div className={styles.leftdiv}>
              <div className={styles.resturantnamediv}>
                <div className={styles.namelabel}>
                  <label htmlFor="ownerName">Owner Name</label>
                </div>
                <div className={styles.nameinput}>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    placeholder="Enter Your Owner Name"
                    required
                  />
                </div>
              </div><br />
              <div className={styles.resturantnamediv}>
                <div className={styles.namelabel}>
                  <label htmlFor="restaurantName">Restaurant Name</label>
                </div>
                <div className={styles.nameinput}>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    placeholder="Enter Your Restaurant Name"
                    required
                  />
                </div>
              </div>

              <div className={styles.pickupaddressdiv}>
                <div className={styles.addresslabel}>
                  <label htmlFor="pickupAddress">Pickup Address</label>
                </div>
                <div className={styles.inputaddress}>
                  <input
                    type="text"
                    id="pickupAddress"
                    name="pickupAddress"
                    value={`${addressData.city}`}
                    placeholder="Enter Your Pickup Address"
                    readOnly
                  />
                  <span className={styles.edit} onClick={toggleModal}>Edit</span>
                </div>
              </div>

              <div className={styles.emaildiv}>
                <div className={styles.emaillabel}>
                  <label htmlFor="ownerEmail">Owner Email</label>
                </div>
                <div className={styles.emailinput}>
                  <input
                    type="email"
                    id="ownerEmail"
                    name="ownerEmail"
                    placeholder="Enter Your Owner Email"
                    required
                  />
                </div>
              </div>

              <div className={styles.phonediv}>
                <div className={styles.phonelabel}>
                  <label htmlFor="ownerPhone">Owner Phone</label>
                </div>
                <div className={styles.phoneinput}>
                  <input
                    type="text"
                    id="ownerPhone"
                    name="ownerPhone"
                    placeholder="Enter Your Owner Phone Number"
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.rightdiv}>
              <div className={styles.workingdays}>Working Days</div>
              <div className={styles.alldays}>
                <div className={styles.weekdaysname}>
                  {daysOfWeek.map((day) => (
                    <div className={styles.day} key={day}>
                      <input
                        type="checkbox"
                        checked={selectedDays[day]}
                        onChange={() => handleDayChange(day)}
                      />
                      {day}
                    </div>
                  ))}
                  <div className={styles.button}>
                    <button type="button" onClick={toggleSelectAll}>
                      {Object.values(selectedDays).every((day) => day)
                        ? "Deselect All"
                        : "Select All"}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.openingtime}>
                <div className={styles.openingtimelabel}>
                  <label htmlFor="openingTime">Opening Time</label>
                </div>
                <select id="openingTime" className={styles.timeDropdown} name="openingTime">
                  <option value="7:00:00">7:00 AM</option>
                  <option value="8:00:00">8:00 AM</option>
                  <option value="9:00:00">9:00 AM</option>
                  <option value="10:00:00">10:00 AM</option>
                  <option value="11:00:00">11:00 AM</option>
                </select>
              </div>

              <div className={styles.closingtime}>
                <div className={styles.closingtimelabel}>
                  <label htmlFor="closingTime">Closing Time</label>
                </div>
                <select id="closingTime" className={styles.timeDropdown} name="closingTime">
                  <option value="7:00:00">7:00 PM</option>
                  <option value="8:00:00">8:00 PM</option>
                  <option value="9:00:00">9:00 PM</option>
                  <option value="10:00:00">10:00 PM</option>
                  <option value="11:00:00">11:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <button type="button" onClick={onCancel} className={styles.buttoncancel}>
              Cancel
            </button>
            <button type="submit" className={styles.buttoncontinue}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RestaurantInfo;
