import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';

const GoogleLogin = () => {
const { googleSignIn, user } = UserAuth();
const navigate = useNavigate();

const handleGoogleSignIn = async () => {
  try {
    await googleSignIn();
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (user != null) {
    navigate('/listUsers');
  }
}, [user]);

return (
    <Button
      variant="outlined"
      startIcon={<Google />}
      onClick={handleGoogleSignIn}
    >
      Login with Google
    </Button>
  );
};
export default GoogleLogin;