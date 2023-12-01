import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Paper, Avatar,  TextField, Button, Typography, Link } from '@mui/material';
import { Google } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useUserAuth } from '../Context/UserAuthContext';
import { useNavigate } from 'react-router-dom';


const LogIn=({handleChange})=>{

    const paperStyle={padding :20, width:300, margin:'0 auto'};
    const avatarStyle={backgroundColor:'#7300ff'};
    const btnStyle={margin:'8px 0',backgroundColor:'#7300ff'};
    const btnGoogleStyle={backgroundColor:'#ff003f'};
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            await logIn(email, password);
            navigate('/profiles');
        } catch (error) {
           const errorMessage = error.message;
           alert(errorMessage);
        }
    }
    
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
          await googleSignIn();
          navigate('/profiles');
        } catch (error) {
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
                data-cy='login-email'  
                variant='standard' 
                label='Email' 
                placeholder='Enter Email' 
                fullWidth required
                onChange={(e) => setEmail(e.target.value)}  
                />
                <TextField  
                data-cy='login-password'
                variant='standard' 
                label='Password' 
                placeholder='Enter password' 
                type='password' 
                fullWidth required
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit' color='primary' variant='contained' style={btnStyle} fullWidth>Log In</Button>
                <Typography >
                     <Link to='/forgotPass' component={RouterLink} >
                        Forgot password ?
                     </Link>
                </Typography >
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
                
            </Paper>
        </Grid>
    )
}

export default LogIn