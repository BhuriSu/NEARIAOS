import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Link, Alert, Stack } from '@mui/material';
import { useUserAuth } from '../Context';
import { Link as RouterLink } from 'react-router-dom';
import { ForgotContainer } from './ForgotElements';
const SignUp = () => {
    const paperStyle = { padding: 20, width: 300, margin: '0 auto' };
    const headerStyle = { margin: 0 };
    const btnStyle = {margin:'10px 0',backgroundColor: 'rgba(197,0,255,1)'};
    
    const { forgotPassword } = useUserAuth();
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => { 
      e.preventDefault();
      try {
        await forgotPassword(email);
      } catch (error) {
          setError(error);
          console.log(error);
      }
    }
  
    return (
      <ForgotContainer>
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <h2 style={headerStyle}>Please put your email below to reset password</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField  
                    variant='standard' 
                    fullWidth label='Email' 
                    placeholder='Enter your email'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}  
                    />
                    <Button type='submit' variant='contained' style={btnStyle}>Send</Button>
                    <Grid align='center'>
                    <Link to='/startForm' component={RouterLink} style={headerStyle} >
                    Return to LogIn Page
                    </Link>
                    </Grid>
                </form>
                <Stack sx={{ width: '100%' }} >
                {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            </Paper>
        </Grid>
        </ForgotContainer>
    )
}

export default SignUp;