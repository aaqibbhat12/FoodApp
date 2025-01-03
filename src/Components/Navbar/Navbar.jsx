import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../Store/Slices/dateSlice';
import { useLocation } from 'react-router-dom';
import styles from '../Navbar/Navbar.module.css';
import Vector from '../../assets/Images/Vector.png';
import profile from '../../assets/Images/profile.png';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const dates = useSelector((state) => state.date.dates);
  // console.log(dates)
  const currentDate = dates[location.pathname] || ''; // Get date for the current route
  // console.log(currentDate)

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    dispatch(setDate({ route: location.pathname, date: newDate }));
  };

  const showDateInput =
    location.pathname === '/orders' || location.pathname === '/reports' || location.pathname === '/';

  return (
    <div className={styles.container}>
      <div className={styles.FoodCart}>Food Cart</div>
      {showDateInput && (
        <div className={styles.date}>
          <input
            type="date"
            value={currentDate}
            onChange={handleDateChange}
          />
        </div>
      )}
      <div className={styles.search}>
        <img src={Vector} alt="vector" />
        <input type="search" placeholder="Search for orders" />
      </div>
      <div className={styles.profile}>
        <span>Hi, </span>
        <span>Aaqib</span>
        <img src={profile} alt="profile" />
      </div>
    </div>
  );
};

export default Navbar;
