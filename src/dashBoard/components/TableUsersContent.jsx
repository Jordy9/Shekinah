import React, { useState } from 'react'
import { IconButton, TableCell, TableRow } from '@mui/material'
import user from '../../heroes/user.webp'
import { Delete, VisibilityOutlined } from '@mui/icons-material'
import { DialogUsers } from './DialogUsers'
import { useDispatch, useSelector } from 'react-redux'
import { onUserActive } from '../../store/auth/authSlice'
import Swal from 'sweetalert2'
import { eliminarUsuario } from '../../store/auth/thunk'

export const TableUsersContent = (props) => {

    const dispatch = useDispatch();

    const { userActive } = useSelector(state => state.auth);

    const { name, email, juego, avatar} = props

    const { name: nameAvatar, category, backGround, radius, flip, rotate, translateX, translateY } = avatar

    const [showDialog, setShowDialog] = useState(false)
    
    const hanldeShow = (usuario) => {
        dispatch(onUserActive(usuario))
        setShowDialog(true)
    }

    const handleDelete = (usuario) => {
        Swal.fire({
            title: '¿Está seguro que desea eliminar a este usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(eliminarUsuario(usuario))
            }
          })
    }

  return (
    <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
            <img loading="lazy" src={`https://avatars.dicebear.com/api/${category}/:${nameAvatar || name}.svg`} 
                style = {{
                    backgroundColor: backGround, 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: `${radius}%`,
                    transform: 
                    `rotate(${rotate}deg) 
                    translateX(${translateX}%) 
                    translateY(${translateY}%) 
                    scaleX(${(flip) ? '-1' : '1'})`,
                }}
                alt="" />
        </TableCell>

        <TableCell style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
            {name}
        </TableCell>

        <TableCell style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
            {email}
        </TableCell>

        <TableCell style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
            {juego?.puntos || 0}
        </TableCell>

        <TableCell style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
            {juego?.aciertos || 0}
        </TableCell>

        <TableCell style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
            {juego?.errores || 0}
        </TableCell>

        <TableCell align="center" ><IconButton onClick={() => hanldeShow(props)} color = 'info'><VisibilityOutlined /></IconButton> <IconButton onClick={() => handleDelete(props)} color = 'error'><Delete /></IconButton></TableCell>

        {
            (userActive)
                &&
            <DialogUsers ShowDialog={showDialog} setShowDialog = {setShowDialog} />
        }

    </TableRow>
  )
}
