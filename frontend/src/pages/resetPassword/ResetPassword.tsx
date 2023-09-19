import React, { useState,useEffect } from "react";
import ForgotPasswordLayout from "../../components/ForgotPasswordLayout";
import { Button, TextField, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase_config";
import { confirmPasswordReset } from "firebase/auth";

const ResetPassword = () => {
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [oobCode, setOobCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParams: any = new URLSearchParams(new URL(currentUrl).search);
    setOobCode(urlParams.get("oobCode"));
    console.log(oobCode);
    console.log(auth);
  }, []);

  const submit = async (e: any) => {
    try {
      e.preventDefault();
      await confirmPasswordReset(auth, oobCode, pass);
      console.log(oobCode);
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
          id="pass"
          value={pass}
          style={{
            borderRadius: "8px",
            border: "1px solid #D8E0E8",
            background: "#F8F9FD",
            marginBottom: "1rem",
          }}
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
          id="confirm-pass"
          value={confirmPass}
          style={{
            borderRadius: "8px",
            border: "1px solid #D8E0E8",
            background: "#F8F9FD",
            marginBottom: "1rem",
          }}
          placeholder="Input text here"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPass(e.target.value);
          }}
          type="password"
          required
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            color: "#F1F2F4",
            borderRadius: "8px",
            height: "3rem",
          }}
          disabled={pass.trim() !== confirmPass || !pass.trim()}
        >
          Submit
        </Button>
      </form>
    </ForgotPasswordLayout>
  );
};

export default ResetPassword;
