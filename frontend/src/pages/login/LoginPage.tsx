import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Container,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import logo from '../../assets/images/Logo for auth.jpg';
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
  const [rememberMe, setRememberMe] = useState(false);
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
        navigate('/');
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
    <Container>
      <img
        src={logo}
        alt='Image'
        style={{ width: '140px', height: '30px', top: '40px', left: '76px' }}
      />
      {errorMessage ? (
        <Alert severity='error' onClose={() => setErrorMessage('')}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      ) : null}
      <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <Typography
            style={{
              font: 'Poppins',
              fontSize: '38px',
              fontWeight: '700',
              lineHeight: '45.6px',
              letterSpacing: '-0.4099999964237213px',
              textAlign: 'left',
              color: '#111111',
              width: '113px',
              height: '46px',
              top: '129px',
              left: '100px',
            }}
          >
            Login
          </Typography>

          <Typography
            style={{
              fontFamily: 'Poppins',
              fontSize: '17px',
              fontWeight: '400',
              lineHeight: '22px',
              letterSpacing: '-0.42px',
              textAlign: 'left',
              color: '#89899C',
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

            <FormControlLabel
              control={
                <Controller
                  name='rememberMe'
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      name='rememberMe'
                      color='primary'
                    />
                  )}
                />
              }
              label='Remember me'
            />

            <Link to={'/forgot-password'} className={styles.forgot}>
              Forgot password
            </Link>

            <Button
              variant='contained'
              color='primary'
              fullWidth
              type='submit'
              disabled={!isDirty || !isValid}
            >
              Login
            </Button>
          </form>

          <Typography variant='body2'>
            Don&apos;t have an account?
            <Link to={'/sign-up'} className={styles.sign}>
              Sign up
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src={image} alt='Image' style={{ width: '100%', height: 'auto' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
