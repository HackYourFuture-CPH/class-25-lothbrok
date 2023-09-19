import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, Checkbox, FormControlLabel, Typography, Link } from '@mui/material';
import '../../App.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
    
  };

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'left' }}>
            <Typography variant="h5">Login</Typography>
            <Typography variant="subtitle2">Easy steps to enter the platform:</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Input Text Here"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Input Text Here"
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              <Link href="#">Forgot password</Link>
            </Typography>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Don't have an account? <Link href="#">Sign up</Link>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src="your-image.jpg" alt="Image" style={{ width: '100%', height: 'auto' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
