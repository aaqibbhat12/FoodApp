import React from 'react'
import styles from '../StartPage/Startpage.module.css'
import dot from '../../assets/Images/Ellipse 1.png'

const Startpage = () => {
  return (
    <div className={styles.maindiv}>
        <div className={styles.onboardingdiv}>
        Start Your Onboarding Process
        </div>
        <div className={styles.maindiv2}>
    <div className={styles.leftdiv}>Prepare your restaurant delivery 
    in less than a day!</div>
    <div className={styles.rightdiv}>
        <div className={styles.textdiv}>
        Keep the following Documents
        ready for Smooth Onboarding!
        </div>
        <div className={styles.cardsdiv}>
            <div className={styles.pancard}>
                <img src={dot} alt='panimage'className={styles.image}/>
                <span className={styles.span}>Pan Card</span>
            </div>
            <div className={styles.gstin}>
                <img src={dot} alt='panimage'className={styles.image}/>
                <span className={styles.span}>GSTIN</span>
            </div>
            <div className={styles.bank}>
                <img src={dot} alt='panimage'className={styles.image}/>
                <span className={styles.span}>Bank Account Details</span>
            </div>
            <div className={styles.contact}>
                <img src={dot} alt='panimage' className={styles.image}/>
                <span className={styles.span}>Contact Details</span>
            </div>
        </div>
        <div className={styles.button}>
            <button>Continue</button>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Startpage