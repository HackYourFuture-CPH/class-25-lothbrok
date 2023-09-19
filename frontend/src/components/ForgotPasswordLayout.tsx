import React, { useState } from 'react';
import '../pages/forgotPassword/forgotPassword.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../assets/images/authLogo.svg';
import image from '../assets/images/Stuck at Home Sitting On Floor.svg';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="forgot-pass">
      <img
        src={logo}
        className="icon"
        alt="logo"
        onClick={() => navigate('/')}
      />
      <div className="flex-container">
        <img className="image" src={image} alt="girl sitting" />
        <div className="form">
          <div className="icon" onClick={() => navigate('/login')}>
            <ArrowBackIcon style={{ color: '#E3E4E8' }} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordLayout;
