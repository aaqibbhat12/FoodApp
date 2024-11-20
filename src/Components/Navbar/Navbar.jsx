import React from 'react'
import styles from '../Navbar/Navbar.module.css'
import Vector from '../../assets/Images/Vector.png'
import profile from '../../assets/Images/profile.png'

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.FoodCart}>
            Food Cart
        </div>
      <div className={styles.date}>
        <input type="date" />
      </div>
      <div className={styles.search}>
        <img src={Vector} alt="vector" />
        <input type="search" placeholder='Search for orders'/>
      </div>
      <div className={styles.profile}>
        <span>Hi, </span>
        <span> Aaqib</span>
        <img src={profile} alt="profile" />
      </div>
    </div>
  )
}

export default Navbar
