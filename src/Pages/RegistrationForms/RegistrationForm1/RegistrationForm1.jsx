import React, { useState } from 'react';
import styles from '../RegistrationForm1/RegistrationForm1.module.css';
import Vector from '../../../assets/Images/Vector (7).png'
import group from '../../../assets/Images/Group.png'
import AddressModal from '../../../Components/Modals/AddressModal/AddressModal';


const RegistrationForm1 = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDays, setSelectedDays] = useState(
    daysOfWeek.reduce((days, day) => ({ ...days, [day]: false }), {})
  );
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal state
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

  
  const goToStep = (step) => {
   
    if (step >= 1) {
      setCurrentStep(step);
    }
  };
 
  

  return (
    <div className={styles.container}>
      {isModalOpen && <AddressModal />}
      <div className={styles.FoodCart}>
        <div>Food Kart for Restaurants</div>
      </div>

      {/* Steps */}
      <div className={styles.stepsdiv}>
      <div
        className={styles.step1div}
        onClick={() => goToStep(1)}
      >
        <div className={styles.resturantinfo}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              checked={currentStep === 1}
              readOnly
              className={currentStep === 1 ? styles.checkedBox : styles.uncheckedBox}
            />
          </div>
          STEP 1 : Restaurant Info
        </div>
      </div>

      <div
        className={styles.step1div}
        onClick={() => goToStep(2)}
      >
        <div className={styles.resturantinfo}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              checked={currentStep === 2}
              readOnly
              className={currentStep === 2 ? styles.checkedBox : styles.uncheckedBox}
            />
          </div>
          STEP 2 : Restaurant Docs
        </div>
      </div>

      <div
        className={styles.step1div}
        onClick={() => goToStep(3)}
      >
        <div className={styles.resturantinfo}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              checked={currentStep === 3}
              readOnly
              className={currentStep === 3 ? styles.checkedBox : styles.uncheckedBox}
            />
          </div>
          STEP 3 : Contract
        </div>
      </div>
    </div>

      {/* Step 1 Content */}
      {currentStep === 1 && (
        <div className={styles.leftrightmaindiv}>
          <div className={styles.leftdiv}>
            {/* Step 1 Left Content */}
            <div className={styles.resturantnamediv}>
              <div className={styles.namelabel}>
                <label>Restaurant Name</label>
              </div> 
              <div className={styles.nameinput}>
                <input type="text" placeholder="Enter Your Restaurant Name" />
              </div>
            </div>
            <div className={styles.pickupaddressdiv}>
              <div className={styles.addresslabel}>
                <label>Pickup Address</label>
              </div>
              <div className={styles.inputaddress}>
                <input type="text" placeholder="Enter Your Pickup Address" />
                <span className={styles.edit} onClick={toggleModal}>Edit</span>
              </div>
            </div>
            <div className={styles.emaildiv}>
              <div className={styles.emaillabel}>
                <label>Owner Email</label>
              </div>
              <div className={styles.emailinput}>
                <input type="email" placeholder="Enter Your Owner Email" />
              </div>
            </div>
            <div className={styles.phonediv}>
              <div className={styles.phonelabel}>
                <label>Owner Phone</label>
              </div>
              <div className={styles.phoneinput}>
                <input type="text" placeholder="Enter Your Owner Phone Number" />
              </div>
            </div>
          </div>

          <div className={styles.rightdiv}>
            {/* Step 1 Right Content */}
            <div className={styles.workingdays}>Working Days</div>
            <div className={styles.alldays}>
      <div className={styles.weekdaysname}>
        {daysOfWeek.map((day) => (
          <div className={styles.day} key={day}>
            <input
              type="checkbox"
              checked={selectedDays[day]}
              onChange={() => handleDayChange(day)}
            />{" "}
            {day}
          </div>
        ))}
        <div className={styles.button}>
          <button onClick={toggleSelectAll}>
            {Object.values(selectedDays).every((day) => day) ? "Deselect All" : "Select All"}
          </button>
        </div>
      </div>
    </div>

            <div className={styles.openingtime}>
              <div className={styles.openingtimelabel}>
                <label htmlFor="openingTime">Opening Time</label>
              </div>
              <select id="openingTime" className={styles.timeDropdown}>
                <option value="7:00 AM">7:00 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
              </select>
            </div>

            <div className={styles.closingtime}>
              <div className={styles.closingtimelabel}>
                <label htmlFor="closingTime">Closing Time</label>
              </div>
              <select id="closingTime" className={styles.timeDropdown}>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="9:00 PM">9:00 PM</option>
                <option value="10:00 PM">10:00 PM</option>
                <option value="11:00 PM">11:00 PM</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 Content */}
      {currentStep === 2 && (
        <div className={styles.leftrightmaindiv2}>
          <div className={styles.leftdiv2}> 
          <div className={styles.outlettype}>
        <div className={styles.outletlabel}>
          <label htmlFor="name">Outlet Type</label>
        </div>
        <div className={styles.outloptions}>
        <select id="closingTime" className={styles.outletDropdown}>
                <option value="outlet">Select</option>
                <option value="outlet">outlet1</option>
              </select>
        </div>
        <div className={styles.pannumber}>
          <div className={styles.labelpannumber}>
            <label htmlFor="number">Pan Number <span className={styles.star}>*</span></label>
          </div>
          <div className={styles.pannumberinput}>
            <input type="text" placeholder='Enter Owner/business PAN' />
          </div>
        </div>
        <div className={styles.GSTIN}>
          <div className={styles.labelgstin}>
            <label htmlFor="number">GSTIN <span  className={styles.star}>*</span></label>
          </div>
          <div className={styles.pannumberinput}>
            <input type="text" placeholder='Enter GST Number' />
          </div>
        </div>
          </div>
          </div>
          <div className={styles.rightdiv2}>
         <div className={styles.BankAccount}>
          <div className={styles.BankAccountlabel}>
            <label htmlFor="name">Bank Account <span  className={styles.star}>*</span></label>
          </div>
          <div className={styles.BankAccountinput}>
            <input type="text" placeholder='Enter Bank Account Number' />
          </div>
         </div>
         <div className={styles.BankIfsc}>
          <div className={styles.Ifsclabel}>
            <label htmlFor="name">Bank IFSC <span  className={styles.star}>*</span></label>
          </div>
          <div className={styles.BankAccountinput}>
            <input type="text" placeholder='Enter Bank IFSC Code' />
          </div>
         </div>
         <div className={styles.Fssainumber}>
          <div className={styles.fssailabel}>
            <label htmlFor="name">FSSAI Number <span  className={styles.star}>*</span></label>
          </div>
          <div className={styles.BankAccountinput}>
            <input type="text" placeholder='Enter FSSAI Certificate Number' />
          </div>
         </div>
          </div>
        </div>
      )}

      {/* Step 3 Content */}
      {currentStep === 3 && (
        <div className={styles.maindiv3}>
         <div className={styles.textdiv}>
         Download, Sign, and Upload Your Contract – Join Food Kart Network Today!
         </div>
         <div className={styles.buttondownload}>
          <button >Download Contract </button>
          <div className={styles.downloadimage}>
          <img src={Vector} alt="image" />
          </div>
          
         </div>
         <div className={styles.browsemaindiv}>
          <div className={styles.groupimagesdiv}>
          <img src={group} alt="" />
          </div>
  <div className={styles.dragordropdiv}>
 Drag or Drop here
  </div>
  <div className={styles.uploadbuttondiv}>
  <button >Browse</button>
  </div>
  <div className={styles.uploadbutton}>
          <button>upload</button>
         </div>
         </div>
        </div>
       
      )}

      {/* Bottom Buttons */}
      <div className={styles.buttons}>
        <div className={styles.buttoncancel}>
          <button onClick={() =>goToStep(currentStep - 1) }>Cancel</button>
        </div>
        <div className={styles.buttoncontinue}>
          {currentStep < 3 ? (
            <button onClick={() => goToStep(currentStep + 1)}>Continue</button>
          ) : (
            <button>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm1;
