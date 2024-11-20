import React from 'react';
import style from '../Auth/Signup.module.css';
import Vector from '../../assets/Images/Vector 1.png'

const Signup = () => {
  return (
    <div className={style.container}>
        
        <div className={style.partnerdiv}>
  <div className={style.partnerinsidediv}>
    <div className={style.partnerline}>
      <p className={style.partnerspan}>Partner</p>
      <span className={style.withspan}>With</span>
    </div>
    <span className={style.foodcartspan}>Food Cart</span>
    <img className={style.vectorimg} src={Vector} />
  </div>
</div>

      
      <div className={style.getstarted}>
        <div className={style.textgetstarted}>Get Started</div>
        
        <form>
          <div className={style.mobile}>
            <label>Mobile</label><br />
            <input type="number" placeholder="Enter Your Mobile Number" />
          </div>
          
          <div className={style.button}>
            <button type="submit">Continue</button>
          </div>
          
          <div className={style.lastdiv}>
            <span>By signing in, I consent to Food Kart’s T&C</span>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Signup;
