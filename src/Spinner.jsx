import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

export const Spinner = () => {
    return (
      <Grid sx = {{height: '100vh'}} display={'flex'} justifyContent = {'center'} alignItems = {'center'}>
        <CircularProgress color="primary" />
      </Grid>
    )
}
  
