import React, { useState } from 'react';
import './forgotPassword.css';
import '../../App.css';
import { Button, TextField, InputLabel } from '@mui/material';
import ForgotPasswordLayout from '../../components/ForgotPasswordLayout';

function ForgotPassword() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // add when firebase auth configured
      // firebase.auth().sendPasswordResetEmail(email)
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ForgotPasswordLayout>
      <h1>Forgot password</h1>
      {!submitted ? (
        <>
          <p>We will send reset password you link on your mail</p>
          <form onSubmit={submit}>
            <InputLabel htmlFor="email" style={{ color: '#55555F' }}>
              Email
            </InputLabel>
            <TextField
              id="email"
              value={email}
              style={{
                borderRadius: '8px',
                border: '1px solid #D8E0E8',
                background: '#F8F9FD'
              }}
              placeholder="Input text here"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              type={'email'}
              required
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                color: '#F1F2F4',
                borderRadius: '8px',
                height: '3rem'
              }}
              disabled={!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}>
              Reset Password
            </Button>
          </form>
        </>
      ) : (
        <>
          <p>
            We sent the reset link to your email. Please check your email and
            click on link
          </p>
          <p>
            Didn’t receive email? <a onClick={submit}>Resend</a>
          </p>
        </>
      )}
    </ForgotPasswordLayout>
  );
}

export default ForgotPassword;
