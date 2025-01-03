import React from 'react'
import styles from '../../Pages/Settings/Settings.module.css'
import profile from '../../assets/Images/profile.jpg'
import axios from 'axios'
import BASE_URI from '../../uri.config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Settings = () => {
    const navigate= useNavigate()

    const updateRestaurant = async () => {
        const token = localStorage.getItem("authToken");
      
        if (!token) {
          toast.error("You are not logged in. Please log in to get access.");
          navigate("/signup");
          return; 
        }
      
        try {
          const response = await axios.patch(
            `${BASE_URI}/api/restaurant/updateRestaurant`,
            { /* Add your request body here */ },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data); 
        } catch (error) {
          console.error("Error updating restaurant:", error);
        }
      };

      
      updateRestaurant()
      
      
      
  return (
    <div className={styles.container}>
        <div className={styles.topdiv}>
            Settings
        </div>
        <div className={styles.secondDiv}>
            <div className={styles.profilediv}>
                <div className={styles.profile}>
                    <img src={profile} alt="profile" />
                </div>
                <label htmlFor="name">Karims Restaurant</label>
            </div>
            <div className={styles.inputDivs}>
<div className={styles.inputsLeftdiv}>
<div className={styles.nameDiv}>
    <label htmlFor="name">Full Name</label><br />
    <input type="text" placeholder='Karims Restaurant'/>
</div>
<div className={styles.nameDiv}>
    <label htmlFor="name">Email</label><br />
    <input type="text" placeholder='Karims@gmail.com'/>
</div>
<div className={styles.nameDiv}>
    <label htmlFor="name">Mobile Number</label><br />
    <input type="text" placeholder='9797979797'/>
</div>
</div>
<div className={styles.inputsRightdiv}>
<div className={styles.nameDiv}>
    <label htmlFor="name">Restaurant Name</label><br />
    <input type="text" placeholder='Gogji Bagh Srinagar'/>
</div>
<div className={styles.nameDiv}>
    <label htmlFor="name">Pincode</label><br />
    <input type="text" placeholder='19008'/>
</div>
<div className={styles.buttonsDiv}>
    <div className={styles.cancelbutton}>
        <button>Cancel</button>
    </div>
    <div className={styles.savechangesbutton}>
        <button>Save Changes</button>
    </div>
</div>
</div>
            </div>
        </div>
        </div>
  )
}

export default Settings