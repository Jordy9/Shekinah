import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Navbar } from '../components/Navbar'

export const DashBoardLayaout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}}>
        {/* <Navbar /> */}

        <Box
            component = 'main'
            sx={{flexGrow: 1, p: 3}}
        >

            <Toolbar />
            
            {children}
        </Box>
    </Box>
  )
}
