import { Alert, Snackbar } from '@mui/material';
import React from 'react';

const Notification = () => {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        sx={{ width: '100%' }}
        variant="filled"
        elevation={6}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;