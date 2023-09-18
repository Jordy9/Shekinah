import { CreateOutlined, Group, Home, ListAlt } from '@mui/icons-material'
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Drawer = ({show, setShow}) => {

    const listRoute = [
        {
            label: 'Lobi',
            route: '/Lobi',
            Icon: () => <Home />
        },

        {
            label: 'Usuarios',
            route: '/usuarios',
            Icon: () => <Group />
        },

        {
            label: 'Crear pregunta',
            route: '/crearPregunta',
            Icon: () => <CreateOutlined />
        },

        {
            label: 'Listado de preguntas',
            route: '/listadoPreguntas',
            Icon: () => <ListAlt />
        },

        {
            label: 'Temas',
            route: '/temas',
            Icon: () => <ListAlt />
        },
    ]

    const navigate = useNavigate()

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={show}
      onClose={() => setShow(false)}
    //   onOpen={true}
    >
        <Box sx = {{width: 250}}>
            {
                listRoute.map(({label, route, Icon}, index) => (
                    <ListItem key={route} disablePadding>
                        <ListItemButton onClick={() => navigate(route)}>
                            <ListItemIcon>
                                <IconButton>
                                    <Icon />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </Box>
    </SwipeableDrawer>
  )
}
