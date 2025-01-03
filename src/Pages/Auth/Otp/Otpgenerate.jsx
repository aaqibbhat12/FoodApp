import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import style from '../Otp/Otpgenerate.module.css';
import Vector from '../../../assets/Images/Vector 1.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URI from '../../../uri.config';
import { toast } from 'react-toastify';

const Otpgenerate = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mobile, setMobile] = useState(null); // State to store the phone number

  const navigate = useNavigate();

  // Check if the user is logged in by validating the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token); // Decode the token to get its info
        const currentTime = Date.now() / 1000; // Get the current timestamp

        if (decodedToken.exp > currentTime) {
          navigate('/registrationform1'); // Redirect if token is valid
        } else {
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('authToken'); // Remove expired token
          navigate('/signup'); // Redirect to signup if token expired
        }
      } catch (error) {
        toast.error('Invalid token. Please log in again.');
        localStorage.removeItem('authToken'); // Remove invalid token
        navigate('/signup'); // Redirect to signup if token is invalid
      }
    }
  }, [navigate]);

  // Retrieve phone number from localStorage on component mount
  useEffect(() => {
    const phoneNumber = localStorage.getItem('phone_no');
    if (phoneNumber) {
      setMobile(phoneNumber);
    } else {
      toast.error('Phone number not found. Please sign up again.');
      navigate('/signup'); // Redirect to signup if phone number is missing
    }
  }, [navigate]);

  const handleChange = (otpValue) => {
    setOtp(otpValue);
  };

  const submitOtp = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URI}/api/restaurant/sellerLogin/${mobile}`, {
        givenOTP: otp,
      });

      console.log('OTP verification response:', response.data);
      const { token, approved } = response.data;

      // Store the token
      localStorage.setItem('authToken', token);
      toast.success(response.data.message);

      // Navigate based on the `approved` value
      if (approved === 1) {
        navigate('/dashboard'); // If approved, navigate to the dashboard
      } else {
        navigate('/registrationform1'); // Otherwise, navigate to the registration form
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Failed to verify OTP. Please try again.';
      console.error('Error verifying OTP:', errorMessage);
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
      {/* Left Section */}
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

      {/* Right Section */}
      <div className={style.rightdiv}>
        <div className={style.verifycode}>Verify Code</div>
        <div className={style.otpsent}>
          <span>OTP sent</span>
          <br />
          <span>Join us and turn your passion</span>
          <br />
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
          <button
            className={style.continuebutton}
            onClick={submitOtp} // Submit OTP and mobile number to the backend
            disabled={loading || otp.length !== 4} // Disable button during loading or if OTP is incomplete
          >
            {loading ? 'Verifying...' : 'Continue'}
          </button>
        </div>
        {error && <div className={style.error}>{error}</div>}
      </div>
    </div>
  );
};

export default Otpgenerate;
