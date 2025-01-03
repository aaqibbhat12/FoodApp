import React from 'react'
import styles from '../../Registration/RestaurantContract/contract.module.css'
import Vector from '../../../assets/Images/Vector (7).png'
import group from '../../../assets/Images/Group.png'

const Contract = () => {
  return (
    <div className={styles.container}>
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
        <div className={styles.buttons}>
        <div className={styles.buttoncancel}>
          <button >Cancel</button>
        </div>
        <div className={styles.buttoncontinue}>
            <button >Submit</button>
        </div>
      </div>

    </div>
  )
}

export default Contract