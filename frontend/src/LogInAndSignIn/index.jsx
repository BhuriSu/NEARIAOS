import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';
import { UserAuth } from '../Context';

const Login = () => {
  const { LogIn } = UserAuth();
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const LogInLogic = async (e) => {
      e.preventDefault();
      try {
        await LogIn(email, password)
        navigate('/listUsers')
      } catch (e) {
        console.log(e.message)
      }
    };
    const SignInLogic = async (e) => {
      e.preventDefault();
      try {
        await createUser(name, email, password);
        navigate('/process')
      } catch (e) {
        console.log(e.message);
      }
    };
    if (!isRegister) {
      return <LogInLogic /> 
    }
    if (isRegister) { 
      return <SignInLogic /> 
    }
    if (password !== confirmPassword) {
      return {
          open: true,
          severity: 'error',
          message: 'Passwords do not match',
        }
    }
  };

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister
          ? 'Do you have an account? Sign in now '
          : "Don't you have an account? Create one now "}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;