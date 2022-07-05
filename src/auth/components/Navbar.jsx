import { LogoutOutlined } from '@mui/icons-material'
import { AppBar, Avatar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const Navbar = () => {

  return (
    <AppBar
        position='fixed'
    >
        <Toolbar>
            <Grid
                item
            >
                <Typography variant='h3'>Shekinah</Typography>
            </Grid>

            <Grid
                item container direction='row' justifyContent={'center'}
            >
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
