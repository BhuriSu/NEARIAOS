import React, {useState} from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useUserAuth } from '../Context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const paperStyle = { padding: 20, width: 300, margin: '0 auto' };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: '#ff0593' };
    const btnStyle = {  marginTop: 5,backgroundColor: '#ff0593' };
    const marginTop = { marginTop: 4 };
    
    const { signUp } = useUserAuth();
    let navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [ setError] = useState(null);
    const handleSubmit = async (e) => { 
        e.preventDefault()
        try {
            await signUp(email, password);
            navigate('/process');
            if (password !== confirmPassword) {
                setError('Passwords need to match!')
                return
            }
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField  
                    variant='standard' 
                    fullWidth label='Email' 
                    placeholder='Enter your email'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}  
                    />

                    <FormControl component='fieldset' style={marginTop}>
                        <FormLabel component='legend'>Gender</FormLabel>
                        <RadioGroup aria-label='gender' name='gender' style={{ display: 'initial' }}>
                            <FormControlLabel value='female' control={<Radio />} label='Female' />
                            <FormControlLabel value='male' control={<Radio />} label='Male' />
                            <FormControlLabel value='lgbt' control={<Radio />} label='Lgbt' />
                        </RadioGroup>
                    </FormControl>

                    <TextField  
                    variant='standard' 
                    fullWidth label='Password' 
                    placeholder='Enter your password'
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField  
                    variant='standard' 
                    fullWidth label='Confirm Password' 
                    placeholder='Confirm your password'
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    
                    <Button type='submit'
                     variant='contained' style={btnStyle}>Sign up</Button>
                
                </form>
               
            </Paper>
        </Grid>
    )
}

export default SignUp;