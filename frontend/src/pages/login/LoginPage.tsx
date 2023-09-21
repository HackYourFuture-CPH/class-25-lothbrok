import React, { useEffect, useState } from 'react';
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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      console.error(e);
    }

  };

  return (
    <Container>
      <img
        src={logo}
        alt="Image"
        style={{ width: "140px", height: "30px", top: "40px", left: "76px" }}
      />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={6}>
          <Typography
            style={{
              font: "Poppins",
              fontSize: "38px",
              fontWeight: "700",
              lineHeight: "45.6px",
              letterSpacing: "-0.4099999964237213px",
              textAlign: "left",
              color: "#111111",
              width: "113px",
              height: "46px",
              top: "129px",
              left: "100px",
            }}
          >
            Login
          </Typography>

          <Typography
            style={{
              fontFamily: "Poppins",
              fontSize: "17px",
              fontWeight: "400",
              lineHeight: "22px",
              letterSpacing: "-0.4099999964237213px",
              textAlign: "left",
              color: "#89899C",
            }}
          >
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
              width: "Fill (273px)",
              height: "Hug (49px)",
              padding: "14px, 16px, 14px, 16px",
              borderRadius: "8px",
              border: "1px",
              gap: "10px",
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
              fontFamily: "Inter",
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "20px",
              letterSpacing: "-0.24px",
              textAlign: "right",
            }}
          ></Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}
          >
            Login
          </Button>

          <Typography className="account">
            Don't have an account?
            <Link to={'/sign-up'} className="sign">
              Sign up
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src={image}
            alt="Image"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
