import { useForm, SubmitHandler } from 'react-hook-form';
import './signUp.css';
import { Button, TextField, InputLabel, Checkbox } from '@mui/material';
import logo from '../../assets/images/authLogo.svg';
import image from '../../assets/images/Hands Show.svg';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase_config';
import { passwordPattern } from '../../passwordPattern';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { register, formState, handleSubmit } = useForm<FormData>();

  const { isDirty, isValid } = formState;

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sign-up">
      <img src={logo} className="icon" alt="logo" />
      <div className="flex-container">
        <img className="image" src={image} alt="hand holding globe" />
        <div className="form">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div>
                <InputLabel htmlFor="first-name" style={{ color: '#55555F' }}>
                  First Name
                </InputLabel>
                <TextField
                  className="input-styles"
                  {...register('firstName', {
                    required: 'First name is required'
                  })}
                  placeholder="First Name"
                />
              </div>
              <div>
                <InputLabel htmlFor="last-name" style={{ color: '#55555F' }}>
                  Last Name
                </InputLabel>
                <TextField
                  {...register('lastName', {
                    required: 'Last name is required'
                  })}
                  placeholder="Last Name"
                />
              </div>
            </div>
            <InputLabel htmlFor="email" style={{ color: '#55555F' }}>
              Email
            </InputLabel>
            <TextField
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format'
                }
              })}
              placeholder="Email"
            />

            <InputLabel htmlFor="password" style={{ color: '#55555F' }}>
              Password
            </InputLabel>
            <TextField
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                },
                pattern: {
                  value: passwordPattern,
                  message:
                    'Password must contain at least one uppercase letter and at least one symbol (! or _)'
                }
              })}
              placeholder="Password"
            />
            <div>
              <Checkbox /> Remeber me
            </div>
            <Button
              className="button-style"
              type="submit"
              variant="contained"
              disabled={!isDirty || !isValid}>
              Sign Up
            </Button>
          </form>
          <div className="small">
            Already have an account?{' '}
            <a onClick={() => navigate('/login')}>Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;