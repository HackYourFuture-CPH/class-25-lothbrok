import React, { useState } from 'react';
import { Button, TextField, InputLabel } from '@mui/material';
import logo from '../../assets/images/authLogo.svg';
import image from '../../assets/images/Hands Show.svg';
import { useNavigate } from 'react-router';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [data, setData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // register user
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="sing-up">
      <img
        src={logo}
        className="icon"
        alt="logo"
        onClick={() => navigate('/')}
      />
      <div className="flex-container">
        <img className="image" src={image} alt="hand holding globe" />
        <div className="form">
          <h1>Sign up</h1>
          <form onSubmit={submit}>
            <div>
              <InputLabel htmlFor="first-name" style={{ color: '#55555F' }}>
                First Name
              </InputLabel>
              <TextField
                id="first-name"
                name="firstName"
                value={data.firstName}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #D8E0E8',
                  background: '#F8F9FD',
                  marginBottom: '1rem'
                }}
                placeholder="Input text here"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateData(e);
                }}
                required
              />
              <InputLabel htmlFor="last-name" style={{ color: '#55555F' }}>
                Last Name
              </InputLabel>
              <TextField
                id="last-name"
                name="lastName"
                value={data.lastName}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #D8E0E8',
                  background: '#F8F9FD',
                  marginBottom: '1rem'
                }}
                placeholder="Input text here"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateData(e);
                }}
                required
              />
            </div>
            <InputLabel htmlFor="email" style={{ color: '#55555F' }}>
              Email
            </InputLabel>
            <TextField
              id="email"
              name="email"
              value={data.email}
              style={{
                borderRadius: '8px',
                border: '1px solid #D8E0E8',
                background: '#F8F9FD',
                marginBottom: '1rem'
              }}
              placeholder="Input text here"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateData(e);
              }}
              required
            />
            <InputLabel htmlFor="password" style={{ color: '#55555F' }}>
              Password
            </InputLabel>
            <TextField
              id="password"
              name="password"
              value={data.password}
              style={{
                borderRadius: '8px',
                border: '1px solid #D8E0E8',
                background: '#F8F9FD',
                marginBottom: '1rem'
              }}
              placeholder="Input text here"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateData(e);
              }}
              type="password"
              required
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                color: '#F1F2F4',
                borderRadius: '8px',
                height: '3rem'
              }}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
