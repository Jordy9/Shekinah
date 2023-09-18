import { Delete, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ModalQuestion } from './ModalQuestion';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { getIsOpen, getTemaActivo } from '../../store/temas/temasSlice';
import { deleteTema } from '../../store/temas/thunk';

export const QuestionListTema = (props) => {

    const dispatch = useDispatch()

    const [Show, setShow] = useState(false)

    const OpenModal = (pregunta) => {
      dispatch(getTemaActivo(pregunta))
      dispatch(getIsOpen(true))
    }

    const Handleddelete = () => {
        Swal.fire({
          title: '¿Está seguro que desea eliminar este tema?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteTema(props._id))
          }
        })
      }

      const elipsis = {
        width: '150px', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis'
      }

  return (
    <>
      <TableRow
        key={props._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell size='small' component="th" scope="row"><Typography fontSize='0.875rem' sx={elipsis}>{props.tema}</Typography></TableCell>
        <TableCell size='small' align="center" ><IconButton onClick={() => OpenModal(props)} color = 'info'><VisibilityOutlined /></IconButton> <IconButton onClick={Handleddelete} color = 'error'><Delete /></IconButton></TableCell>
      </TableRow>
      
      {
        (props)
          &&
        <ModalQuestion Show = {Show} setShow = {setShow} />
      }
    </>
  )
}
