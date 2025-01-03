import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation
import styles from '../Sidebar/Sidebar.module.css';
import dashboard from '../../assets/Images/dashboard.png';
import menuimg from '../../assets/Images/Vector (9).png';
import whitearrow from '../../assets/Images/whitearrow.png';
import Orders from "../../assets/Images/Orders.png";
import Reports from '../../assets/Images/Reports.png';
import Settings from '../../assets/Images/Settings.png';
import logoutimage from '../../assets/Images/Vector (10).png';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const [isLinksVisible, setIsLinksVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleLinksVisibility = () => {
    setIsLinksVisible(!isLinksVisible);
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
toast.success("you are logged out !")
    // Redirect to the /signup page

    navigate('/signup');
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboarddiv}>
        <Link to="/" className={styles.Link}>
          <img src={dashboard} alt="dashboard" className={styles.dashboard} />
          Dashboard
        </Link>
      </div>
      <div className={styles.menudiv}>
        <div className={styles.menulink}>
          <img src={menuimg} alt="menu" className={styles.menu} />
          Menu
        </div>
        <img
          src={whitearrow}
          alt="arrow"
          className={`${styles.arrow} ${isLinksVisible ? styles.arrowReversed : ''}`}
          onClick={toggleLinksVisibility} // Toggle visibility on click
        />
      </div>
      <div
        className={`${styles.linksdiv} ${isLinksVisible ? styles.visible : styles.hidden}`}
      >
        <Link to="/addcategory" className={styles.addCategories}>
          Add Categories
        </Link>
      </div>
      <div className={styles.Orders}>
        <Link to="/orders" className={styles.Orderslink}>
          <img src={Orders} alt="orders" className={styles.ordersImage} />
          Orders
        </Link>
      </div>
      <div className={styles.Reports}>
        <Link to="/reports" className={styles.reportsLink}>
          <img src={Reports} alt="Reports" className={styles.reportsImage} />
          Reports
        </Link>
      </div>
      <div className={styles.discount}>
        <Link to="/discount" className={styles.Orderslink}>
          <img src={Reports} alt="Reports" className={styles.reportsImage} />
         Discount
        </Link>
      </div>
      <div className={styles.Settings}>
        <Link to="/settings" className={styles.settingsLink}>
          <img src={Settings} alt="Reports" className={styles.settingsImage} />
          Settings
        </Link>
      </div>
      <div className={styles.logoutdiv}>
        {/* Attach the logout handler */}
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
        <img
          src={logoutimage}
          alt="logout"
          className={styles.logoutimage}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Sidebar;
