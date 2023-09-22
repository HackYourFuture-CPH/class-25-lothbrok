<<<<<<< HEAD
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
=======
import React, { useEffect, useState } from 'react';
>>>>>>> f0bdc65a94e44a0d792ec9ed203e0ba3e1e04d22
import {
  Container,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography
} from '@mui/material';
import logo from '../../assets/images/Logo for auth.jpg';
import image from '../../assets/images/Stuck at Home Imagination.jpg';
import './LoginPage.css';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  browserSessionPersistence
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD
type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
=======
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
    }
>>>>>>> f0bdc65a94e44a0d792ec9ed203e0ba3e1e04d22
  };

  return (
    <Container>
      <img
        src={logo}
        alt="Image"
        style={{ width: '140px', height: '30px', top: '40px', left: '76px' }}
      />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}>
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
              left: '100px'
            }}>
            Login
          </Typography>

          <Typography
            style={{
<<<<<<< HEAD
              fontFamily: "Poppins",
              fontSize: "17px",
              fontWeight: "400",
              lineHeight: "22px",
              letterSpacing: "-0.42px",
              textAlign: "left",
              color: "#89899C",
            }}
          >
            Easy steps to enter the platform
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <>
                  <label className="style-label">Email</label>
                  <TextField
                    fullWidth
                    {...field}
                    placeholder="Input text here"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                </>
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <>
                  <label className="style2-label">Password</label>
                  <TextField
                    fullWidth
                    type="password"
                    {...field}
                    placeholder="Input text here"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                </>
              )}
            />

            <FormControlLabel
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox {...field} name="rememberMe" color="primary" />
                  )}
                />
              }
              label="Remember me"
            />

            <Link className="forgot" href="#">
              Forgot password
            </Link>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2">
            Don't have an account?{" "}
            <Link className="sign" href="#">
=======
              fontFamily: 'Poppins',
              fontSize: '17px',
              fontWeight: '400',
              lineHeight: '22px',
              letterSpacing: '-0.4099999964237213px',
              textAlign: 'left',
              color: '#89899C'
            }}>
            Easy steps to enter the platform
          </Typography>

          <label className="style-label">Email</label>
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Input text here"
          />
          <label className="style2-label">Password</label>
          <TextField
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Input text here"
            style={{
              width: 'Fill (273px)',
              height: 'Hug (49px)',
              padding: '14px, 16px, 14px, 16px',
              borderRadius: '8px',
              border: '1px',
              gap: '10px'
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                name="rememberMe"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Link className="forgot" to={'/forgot-password'}>
            Forgot password
          </Link>
          <Typography
            variant="body2"
            style={{
              fontFamily: 'Inter',
              fontSize: '15px',
              fontWeight: '400',
              lineHeight: '20px',
              letterSpacing: '-0.24px',
              textAlign: 'right'
            }}></Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}>
            Login
          </Button>

          <Typography className="account">
            Don't have an account?
            <Link to={'/sign-up'} className="sign">
>>>>>>> f0bdc65a94e44a0d792ec9ed203e0ba3e1e04d22
              Sign up
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src={image}
            alt="Image"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
