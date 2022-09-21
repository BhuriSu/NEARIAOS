import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import { Google } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useUserAuth } from '../Context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const LogIn=({handleChange})=>{

    const paperStyle={padding :20, width:300, margin:'0 auto'};
    const avatarStyle={backgroundColor:'#7300ff'};
    const btnStyle={margin:'8px 0',backgroundColor:'#7300ff'};
    const btnGoogleStyle={backgroundColor:'#ff003f'};
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            await logIn(email, password);
            navigate('/listUsers');
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
          await googleSignIn();
          navigate('/listUsers');
        } catch (error) {
          setError(error);
          console.log(error);
        }
      };

    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                     <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                <TextField  
                variant='standard' 
                label='Email' 
                placeholder='Enter Email' 
                fullWidth required
                onChange={(e) => setEmail(e.target.value)}  
                />
                <TextField  
                variant='standard' 
                label='Password' 
                placeholder='Enter password' 
                type='password' 
                fullWidth required
                onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        name='checkedB'
                        color='primary'
                    />
                    }
                    label='Remember me'
                 />
                <Button type='submit' color='primary' variant='contained' style={btnStyle} fullWidth>Log In</Button>
                <Typography >
                     <Link to='/ForgotPass' component={RouterLink} >
                        Forgot password ?
                     </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href='#' onClick={()=>handleChange('event',1)} >
                        Sign Up 
                     </Link>
                </Typography>
                <br/>
                <Button
                 style={btnGoogleStyle}
                 variant='contained'
                 startIcon={<Google />}
                 onClick={handleGoogleSignIn}
                >
                Login with Google
                </Button>
                </form>
                <Stack sx={{ width: '100%' }} >
                {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            </Paper>
        </Grid>
    )
}

export default LogIn