import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Container,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";
import logo from "../../assets/images/Logo for auth.jpg";
import image from "../../assets/images/Stuck at Home Imagination.jpg";
import "./LoginPage.css";

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
