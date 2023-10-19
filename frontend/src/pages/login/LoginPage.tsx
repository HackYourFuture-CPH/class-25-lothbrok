import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Checkbox, Typography, Alert, AlertTitle } from '@mui/material';
import logo from '../../assets/images/authLogo.svg';
import image from '../../assets/images/Stuck at Home Imagination.jpg';
import styles from './LoginPage.module.css';

import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  browserSessionPersistence,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginPage: React.FC = () => {
  const [rememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/project');
      }
    });
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const auth = getAuth();
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setErrorMessage('');
    } catch (e: any) {
      if (e.code === 'auth/invalid-login-credentials') {
        setErrorMessage('Invalid email or password');
      } else if (e.message) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage('Something went wrong. Please try again');
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.logo_div}>
        <img
          src={logo}
          alt='Image'
          style={{
            width: '176px',
            height: '30px',
            top: '40px',
            left: '40px',
            position: 'absolute',
          }}
        />
      </div>
      {errorMessage ? (
        <Alert severity='error' onClose={() => setErrorMessage('')}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      ) : null}
      <div className={styles.login_main}>
        <div className={styles.login_content}>
          <Typography
            style={{
              font: 'Poppins',
              fontSize: '40px',
              fontWeight: '800',
              textAlign: 'left',
              color: '#111111',
            }}
          >
            Log in
          </Typography>

          <Typography
            style={{
              fontFamily: 'Poppins',
              textAlign: 'left',
              color: '#89899C',
              marginTop: '10px',
            }}
          >
            Easy steps to enter the platform
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <>
                  <label className={styles.style_label}>Email</label>
                  <TextField
                    fullWidth
                    {...field}
                    placeholder='Input text here'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                </>
              )}
            />

            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <>
                  <label className={styles.style2_label}>Password</label>
                  <TextField
                    fullWidth
                    type='password'
                    {...field}
                    placeholder='Input text here'
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                </>
              )}
            />
            <div className={styles.rememberMe}>
              <div>
                <Checkbox /> Remeber me
              </div>

              <Link to={'/forgot-password'} className={styles.forgot}>
                Forgot password
              </Link>
            </div>
            <Button
              className={styles.button_style}
              variant='contained'
              type='submit'
              fullWidth
              disabled={!isDirty || !isValid}
            >
              Login
            </Button>
          </form>

          <div className={styles.sign_up}>
            Don&apos;t have an account?
            <Link
              to={'/sign-up'}
              style={{
                font: 'Inter',
                paddingLeft: '20px',
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
        <img className={styles.image} src={image} alt='Image' />
      </div>
    </div>
  );
};
export default LoginPage;
