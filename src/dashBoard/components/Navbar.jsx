import { LogoutOutlined } from '@mui/icons-material'
import { AppBar, Avatar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {

    const activeStyle = {
        textDecoration: "none",
        color: 'white'
    }

    const noStyle = {
        textDecoration: 'none',
        color: 'grey'
    }

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
                <NavLink style={({isActive}) => isActive ? activeStyle : noStyle} to ='/usuarios' ><Button color='inherit'>Usuarios</Button></NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : noStyle} to = '/crearPregunta'><Button color='inherit'>Crear Pregunta</Button></NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : noStyle} to = '/listadoPreguntas'><Button color='inherit'>Listado de preguntas</Button></NavLink>
            </Grid>

            <Grid
                item justifyContent='end'
            >
                <Avatar
                    alt="Remy Sharp"
                    src="https://mui.com/static/images/avatar/2.jpg"
                    sx={{ width: 50, height: 50 }}
                />
            </Grid>

            <Grid
                item justifyContent='end'
            >
                <IconButton color='error'>
                    <LogoutOutlined />
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
