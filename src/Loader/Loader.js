import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function ChartLoader() {


  return (
    <div>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 , backgroundColor:"#00000022"}}
        open={true} 
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}