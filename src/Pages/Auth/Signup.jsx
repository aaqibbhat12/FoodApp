import React, { useState } from 'react';
import axios from 'axios'; 
import style from '../Auth/Signup.module.css';
import Vector from '../../assets/Images/Vector 1.png';
import { useNavigate } from 'react-router-dom';
import BASE_URI from '../../uri.config';
import { toast } from 'react-toastify';

const Signup = () => {
  const [mobile, setMobile] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault(); 
    setError(null);
    setLoading(true);

    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URI}/api/restaurant/sellerSendOtp`,
        data: { phone_no: mobile },
      });

      console.log('OTP sent successfully:', response.data);

      // Save mobile number to localStorage after successful OTP request
      localStorage.setItem('phone_no', mobile);

      toast.success(`OTP sent successfully ${response.data.otp}`);
      navigate('/otpgenerate');
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.partnerdiv}>
        <div className={style.partnerinsidediv}>
          <div className={style.partnerline}>
            <p className={style.partnerspan}>Partner</p>
            <span className={style.withspan}>With</span>
          </div>
          <span className={style.foodcartspan}>Food Cart</span>
          <img className={style.vectorimg} src={Vector} alt="Vector" />
        </div>
      </div>

      <div className={style.getstarted}>
        <div className={style.textgetstarted}>Get Started</div>

        <form onSubmit={sendOtp}>
          <div className={style.mobile}>
            <label>Mobile</label><br />
            <input
              required
              type="number"
              placeholder="Enter Your Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)} 
            />
          </div>

          <div className={style.button}>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Continue'}
            </button>
          </div>

          {/* {error && <div className={style.error}>{error}</div>} */}

          <div className={style.lastdiv}>
            <span>By signing in, I consent to Food Kart’s T&C</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
