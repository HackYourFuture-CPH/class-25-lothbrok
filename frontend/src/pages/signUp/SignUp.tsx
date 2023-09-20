import React, { useState } from "react";
import "./signUp.css";
import { Button, TextField, InputLabel, Checkbox } from "@mui/material";
import logo from "../../assets/images/authLogo.svg";
import image from "../../assets/images/Hands Show.svg";

import { useNavigate } from "react-router";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase_config";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(user);
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="sign-up">
      <img
        src={logo}
        className="icon"
        alt="logo"
        onClick={() => navigate("/")}
      />
      <div className="flex-container">
        <img className="image" src={image} alt="hand holding globe" />
        <div className="form">
          <h1>Sign up</h1>
          <form onSubmit={submit}>
            <div className="row">
              <div>
                <InputLabel htmlFor="first-name" style={{ color: "#55555F" }}>
                  First Name
                </InputLabel>
                <TextField
                  className="input-styles"
                  id="first-name"
                  name="firstName"
                  value={data.firstName}
                  placeholder="First Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateData(e);
                  }}
                  required
                />
              </div>
              <div>
                <InputLabel htmlFor="last-name" style={{ color: "#55555F" }}>
                  Last Name
                </InputLabel>
                <TextField
                  className="input-styles"
                  id="last-name"
                  name="lastName"
                  value={data.lastName}
                  placeholder="Last name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateData(e);
                  }}
                  required
                />
              </div>
            </div>
            <InputLabel htmlFor="email" style={{ color: "#55555F" }}>
              Email
            </InputLabel>
            <TextField
              className="input-styles"
              id="email"
              name="email"
              value={data.email}
              placeholder="Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateData(e);
              }}
              required
            />
            <InputLabel htmlFor="password" style={{ color: "#55555F" }}>
              Password
            </InputLabel>
            <TextField
              className="input-styles"
              id="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateData(e);
              }}
              type="password"
              required
            />
            <div>
              <Checkbox /> Remeber me
            </div>
            <Button
              className="button-style"
              type="submit"
              variant="contained"
              disabled={!Object.values(data).every(Boolean)}
            >
              Sign Up
            </Button>
          </form>
          <div className="small">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
