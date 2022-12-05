import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Navb } from '../components/Navb'

export const DashBoardLayaout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}}>
        <Navb />

        <Box
            component = 'main'
            sx={{flexGrow: 1}}
        >

            <Toolbar />
            
            {children}
        </Box>
    </Box>
  )
}
