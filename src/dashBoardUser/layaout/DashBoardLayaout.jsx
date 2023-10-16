import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Drawer } from '../components/Drawer'
import { Navb } from '../components/Navb'

export const DashBoardLayaout = ({children}) => {

  const [show, setShow] = useState(false)

  return (
    <Box>
      <Navb setShow = {setShow} />

      <Drawer show = {show} setShow = {setShow} />

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
