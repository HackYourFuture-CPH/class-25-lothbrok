import React, { useState, useEffect } from "react";
import ForgotPasswordLayout from "../../components/ForgotPasswordLayout";
import { Button, TextField, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase_config";
import { confirmPasswordReset } from "firebase/auth";
import "./resetPassword.css";

const ResetPassword = () => {
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [oobCode, setOobCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParams: any = new URLSearchParams(new URL(currentUrl).search);
    setOobCode(urlParams.get("oobCode"));
  }, []);

  const submit = async (e: any) => {
    try {
      e.preventDefault();
      await confirmPasswordReset(auth, oobCode, pass);
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ForgotPasswordLayout>
      <p>To change your password, please fill in the fields below</p>
      <form onSubmit={submit}>
        <InputLabel htmlFor="pass" style={{ color: "#55555F" }}>
          New Password
        </InputLabel>
        <TextField
          className="input-styles"
          id="pass"
          value={pass}
          placeholder="Input text here"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPass(e.target.value);
          }}
          type="password"
          required
        />
        <InputLabel htmlFor="confirm-pass" style={{ color: "#55555F" }}>
          Confirm New Password
        </InputLabel>
        <TextField
          className="input-styles"
          id="confirm-pass"
          value={confirmPass}
          placeholder="Input text here"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPass(e.target.value);
          }}
          type="password"
          required
        />
        <Button
          className="button-style"
          type="submit"
          variant="contained"
          disabled={pass.trim() !== confirmPass || !pass.trim()}
        >
          Submit
        </Button>
      </form>
    </ForgotPasswordLayout>
  );
};

export default ResetPassword;
