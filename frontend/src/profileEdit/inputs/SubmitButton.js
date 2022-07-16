import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
function SubmitButton() {
  return (
    <Button variant="contained" endIcon={<Send />} type="submit">
      Submit
    </Button>
  );
}

export default SubmitButton;
