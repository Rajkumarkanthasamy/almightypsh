import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {Button, IconButton, Typography, Box, Grid} from '@mui/material';

export default function FilledAlerts() {
  return (
    <Grid item sx={{position:"fixed", top:"100px", left:"100px", width:"50%"}}>
      <Alert variant="filled" severity="error">
      There are currently no documents in the collection that match the specified criteria --!
      </Alert>
      </Grid>
  );
}

