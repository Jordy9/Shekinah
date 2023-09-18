import { Delete, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { ModalQuestion } from './ModalQuestion';
import { useDispatch } from 'react-redux'
import { preguntaActiva } from '../../store/preguntas/preguntasSlice';
import Swal from 'sweetalert2'
import { eliminarPregunta } from '../../store/preguntas/thunk';

export const QuestionList = (props) => {

    const dispatch = useDispatch()

    const {pregunta, idPregunta, respuesta, dificultad, categoria, testamento, idLibro, libro, capitulo, desdeVersiculo, hastaVersiculo, tema} = props

    const [Show, setShow] = useState(false)

    const OpenModal = (pregunta) => {
      dispatch(preguntaActiva(pregunta))
      setShow(true)
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
            dispatch(eliminarPregunta(props))
          }
        })
      }

      const elipsis = {
        width: '150px', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis'
      }

      const testam = (testamento === 'AT') ? 'Antiguo' : 'Nuevo'

  return (
    <>
      <TableRow
        key={pregunta._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell size='small' component="th" scope="row"><Typography fontSize='0.875rem' sx={elipsis}>{pregunta}</Typography></TableCell>
        <TableCell size='small' component="th" scope="row"><Typography fontSize='0.875rem' sx={elipsis}>{tema}</Typography></TableCell>
        <TableCell size='small' component="th" align="center" scope="row">{idPregunta}</TableCell>
        <TableCell size='small' component="th" scope="row"><Typography fontSize='0.875rem' sx={elipsis}>{respuesta[0]?.texto}</Typography></TableCell>
        <TableCell size='small' align="center">{dificultad}</TableCell>
        <TableCell size='small' align="center">{categoria}</TableCell>
        <TableCell size='small' align="center">{testam}</TableCell>
        <TableCell size='small' align="center">{libro}</TableCell>
        <TableCell size='small' align="center">{Number(capitulo) + 1}</TableCell>
        <TableCell size='small' align="center">{Number(desdeVersiculo) + 1}</TableCell>
        <TableCell size='small' align="center">{Number(hastaVersiculo) + 1}</TableCell>
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
