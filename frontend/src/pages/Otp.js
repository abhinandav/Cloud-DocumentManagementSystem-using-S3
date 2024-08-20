import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Otp() {
  const baseURL = 'http://127.0.0.1:8000';
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const registeredEmail = localStorage.getItem('registeredEmail');

  const handleVerification = async (event) => {
    event.preventDefault();
    setError('');
    const enteredOtp = event.target.otp.value;

    try {
      const res = await axios.post(baseURL + '/otp/', {
        email: registeredEmail,
        otp: enteredOtp,
      });
      if (res.status === 200) {
        navigate('/login');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error || 'Verification failed. Please try again.';
        setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
      } else if (error.request) {
        setError('No response received from the server. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-40">
      <div className="flex flex-col space-y-2 text-center ">
        <h2 className="text-3xl md:text-4xl font-bold">Confirm OTP</h2>
        <p className="text-md md:text-xl">
          Enter the OTP we just sent you.
        </p>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <form onSubmit={handleVerification}>
        <div className="flex flex-col max-w-md space-y-5">
          <input
            type="text"
            placeholder="OTP"
            name="otp"
            className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
          />
          <button
            type="submit"
            className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

export default Otp;
