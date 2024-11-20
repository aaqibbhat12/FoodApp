import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import style from '../Otp/Otpgenerate.module.css';
import Vector from '../../../assets/Images/Vector 1.png';

const Otpgenerate = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (otpValue) => {
    setOtp(otpValue);
  };

 
  const renderCustomInput = (props) => (
    <input
      type="number"
      min="0"
      max="9"
      {...props} 
      style={{
        width: '3.5rem',       
        height: '3.5rem',      
        margin: '0 0.5rem',  
        borderRadius: '4px',
        border: '1px solid #ccc',
        textAlign: 'center',
        fontSize: '1.5rem',
      }}
    />
  );

  return (
    <div className={style.maindiv}>
      <div className={style.leftdiv}>
        <div className={style.leftinsidediv}>
          <div className={style.lefttext}>
            <span className={style.partnerspan}>Partner</span>
            <span className={style.withspan}>With</span>
          </div>
          <span className={style.foodcartspan}>Food Cart</span>
          <img className={style.vectorimg} src={Vector} alt="Vector" />
        </div>
      </div>

      <div className={style.rightdiv}>
        <div className={style.verifycode}>Verify Code</div>
        <div className={style.otpsent}>
          <span>OTP sent!</span> <br />
          <span>Join us and turn your passion</span><br />
          <span> into Profit!</span>
          <div className={style.otpinputs}>
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}          
              shouldAutoFocus        
              renderInput={renderCustomInput} 
            />
          </div>
        </div>
        <div className={style.resendotp}>
          <div className={style.insideresendotpdiv}>
            Didn’t get the code? Resend in: <span>0:59</span>
          </div>
        </div>
        <div className={style.buttondiv}>
          <button className={style.continuebutton}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Otpgenerate;
