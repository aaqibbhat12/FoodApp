import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Sidebar/Sidebar.module.css';
import dashboard from '../../assets/Images/dashboard.png';
import menuimg from '../../assets/Images/Vector (9).png';
import whitearrow from '../../assets/Images/whitearrow.png';
import Orders from "../../assets/Images/Orders.png";
import Reports from '../../assets/Images/Reports.png';
import Settings from '../../assets/Images/Settings.png';
import logoutimage from '../../assets/Images/Vector (10).png';

const Sidebar = () => {
  const [isLinksVisible, setIsLinksVisible] = useState(false);

  const toggleLinksVisibility = () => {
    setIsLinksVisible(!isLinksVisible);
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
        <Link to="/addmenu" className={styles.menulink}>
          <img src={menuimg} alt="menu" className={styles.menu} />
          Menu
        </Link>
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
        <Link to="/addmenu" className={styles.addMenu}>
          Add Menu
        </Link>
        <Link to="/addcategory" className={styles.addCategories}>
          Add Categories
        </Link>
        <Link to="/additems" className={styles.addItems}>
          Add Items
        </Link>
      </div>
      <div className={styles.Orders}>
        <Link to="/orders" className={styles.Orderslink}>
          <img src={Orders} alt="orders" className={styles.ordersImage} />
          Orders
        </Link>
      </div>
      <div className={styles.Reports}>
        <Link to="/menu" className={styles.reportsLink}>
          <img src={Reports} alt="Reports" className={styles.reportsImage} />
          Reports
        </Link>
      </div>
      <div className={styles.Settings}>
        <Link to="/menu" className={styles.settingsLink}>
          <img src={Settings} alt="Reports" className={styles.settingsImage} />
          Settings
        </Link>
      </div>
      <div className={styles.logoutdiv}>
        <button>Logout</button>
        <img src={logoutimage} alt="logout" className={styles.logoutimage} />
      </div>
    </div>
  );
};

export default Sidebar;
