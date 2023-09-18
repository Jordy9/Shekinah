import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Box, Typography, TextField, IconButton, Button, CircularProgress, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useResponsive } from '../../hooks/useResponsive';
import { obtenerPreguntaFiltrada, obtenerPreguntas } from '../../store/preguntas/thunk';
import { TableQuestionList } from './TableQuestionList';
  
export const TableQuestion = () => {

  const dispatch = useDispatch()

  const {paginacion} = useSelector(state => state.pg)
  
  const [page, setPage] = useState(0);

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

  const [ respWidth ] = useResponsive()

  return (
    <Box autoComplete="off" sx={{p: 4}}>
      <Typography marginBottom={5} variant='h5'>Listado de preguntas</Typography>

      <Box>

          <TableContainer elevation = {4} component={Paper} sx={{width: '80vw', height: '400px', mx: 'auto', mt: 2, borderTopLeftRadius: '20px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
            <Grid flexDirection='row' container item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
              <TextField name='buscador' value={buscadorSearch} onChange = {({target}) => setBuscadorSearch(target.value)} label = 'Buscador' type='search' variant='standard' sx={{
                m: 1
              }} />

              <Grid display={'flex'} alignItems = {'end'} mb = {0.9}>
                <Button color='primary' variant='contained' onClick={SearchQuestion}>Buscar</Button>
              </Grid>
            </Grid>
            
            <Table aria-label="simple table" stickyHeader = {true}>
              <TableHead>
                <TableRow>
                  <TableCell>Pregunta</TableCell>
                  <TableCell>Tema</TableCell>
                  <TableCell>Id Pregunta</TableCell>
                  <TableCell>Respuesta</TableCell>
                  <TableCell align="center">Dificultad</TableCell>
                  <TableCell align="center">Categoría</TableCell>
                  <TableCell align="center">Testamento</TableCell>
                  <TableCell align="center">Libro</TableCell>
                  <TableCell align="center">Capítulo</TableCell>
                  <TableCell align="center">Desde el versiculo</TableCell>
                  <TableCell align="center">Hasta el versiculo</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableQuestionList />
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{width: '80vw', mx: 'auto', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '20px'}}
            rowsPerPageOptions={[10, 20, 30]}
            labelRowsPerPage = {(respWidth > 991) ? 'Filas por página' : 'Filas'}
            labelDisplayedRows = {({ from, to, count }) => `${from}-${to} de ${count}`}
            component={Paper}
            count={Number(paginacion?.idPreguntasCount) || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Box>
    </Box>
  )
}
