import { Delete, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ModalQuestion } from './ModalQuestion';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { eliminarPreguntaTema } from '../../store/preguntasTema/thunk';
import { preguntaActiva } from '../../store/preguntasTema/preguntasTemaSlice';
import { getIsOpen } from '../../store/preguntasTema/preguntasTemaSlice';

export const QuestionListPreguntasParaTema = (props) => {

    const dispatch = useDispatch()

    const [Show, setShow] = useState(false)

    const OpenModal = (pregunta) => {
      dispatch(preguntaActiva(pregunta))
      dispatch(getIsOpen(true))
    }

    const Handleddelete = () => {
        Swal.fire({
          title: '¿Está seguro que desea eliminar esta pregunta?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(eliminarPreguntaTema(props._id))
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
        <TableCell size='small' component="th" scope="row"><Typography fontSize='0.875rem' sx={elipsis}>{props.pregunta}</Typography></TableCell>
        <TableCell size='small' component="th" scope="row"><Typography fontSize='0.875rem' sx={elipsis}>{props.tema}</Typography></TableCell>
        <TableCell size='small' component="th" scope="row"><Typography fontSize='0.875rem' sx={elipsis}>{props.nota}</Typography></TableCell>
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
