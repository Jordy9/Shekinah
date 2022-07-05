import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Box, Typography, TextField, IconButton, Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { obtenerPreguntaFiltrada, obtenerPreguntas } from '../../store/preguntas/thunk';
import { TableQuestionList } from './TableQuestionList';
  
export const TableQuestion = () => {

  const dispatch = useDispatch()

  const {paginacion} = useSelector(state => state.pg)
  
  const [page, setPage] = useState(Number(paginacion?.page - 1 || 0));

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    dispatch(obtenerPreguntas(1, +event.target.value))
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(obtenerPreguntas(newPage + 1, rowsPerPage))
  };

  const [buscadorSearch, setBuscadorSearch] = useState()

  const SearchQuestion = () => {
    dispatch(obtenerPreguntaFiltrada(buscadorSearch))
  }

  return (
    <Box autoComplete="off" sx={{p: 4}}>
      <Typography marginBottom={5} variant='h4'>Listado de preguntas</Typography>

      <Box sx={{p: 3}}>

        {
          (paginacion)
            ?
          <TableContainer elevation = {4} component={Paper} sx = {{
            height: 400,
            borderRadius: '5px'
          }}>
            <TextField fullWidth name='buscador' value={buscadorSearch} onChange = {({target}) => setBuscadorSearch(target.value)} label = 'Buscador' type='search' variant='standard' sx={{
              m: 1
            }} />
            <Button onClick={SearchQuestion}>Buscar</Button>
            <Table aria-label="simple table" stickyHeader = {true} sx={{ minWidth: 650, overflow: 'auto' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Pregunta</TableCell>
                  <TableCell>Id Pregunta</TableCell>
                  <TableCell>Respuesta</TableCell>
                  <TableCell align="right">Dificultad</TableCell>
                  <TableCell align="right">Categoría</TableCell>
                  <TableCell align="right">Testamento</TableCell>
                  <TableCell align="right">Libro</TableCell>
                  <TableCell align="right">Capítulo</TableCell>
                  <TableCell align="right">Desde el versiculo</TableCell>
                  <TableCell align="right">Hasta el versiculo</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableQuestionList />
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={Number(paginacion?.total) || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          :
          <Box justifyContent='center' alignItems='center' sx={{ display: 'flex', height: '45vh'}}>
            <CircularProgress />
          </Box>
        }
      </Box>
    </Box>
  )
}
