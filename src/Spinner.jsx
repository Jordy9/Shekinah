import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

export const Spinner = ({ tema }) => {
  return (
    <Grid sx = {{height: '100vh'}} display={'flex'} justifyContent = {'center'} alignItems = {'center'}>
      <CircularProgress sx={{ color: ( tema ) ? tema : 'primary.main' }} color="primary" />
    </Grid>
  )
}
  
