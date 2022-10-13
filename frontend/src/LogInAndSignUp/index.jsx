import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LogIn from './LogIn';
import SignIn from './SignUp'; 
import { BackgroundContainer, Logo } from './FormElements';

const SignInOutContainer=()=>{
  const [value, setValue]=useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle={width:300, margin:'20px auto'};

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
    return (
      
      <BackgroundContainer>

      <Logo to='/'>NEARIAOS</Logo>
      
      <Paper elevation={0} style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='disabled tabs example'
        >
          <Tab label='Log In' />
          <Tab label='Sign Up' />
        </Tabs>

        <TabPanel value={value} index={0}>
        <LogIn handleChange={handleChange}/>
        </TabPanel>

        <TabPanel value={value} index={1}>
        <SignIn/>
        </TabPanel>

      </Paper>
      </BackgroundContainer>
    )
}

export default SignInOutContainer;