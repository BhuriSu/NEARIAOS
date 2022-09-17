import React, { useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Loading = () => {
  const open = useState(false);
  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
  );
};

export default Loading;