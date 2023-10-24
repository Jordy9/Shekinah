import { Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'

export const LineasProgress = ({ value, total }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" color='inherit' value={ value } />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.main">{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}
