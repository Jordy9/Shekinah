import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Box, Typography, TextField, IconButton, Button, CircularProgress, Grid } from '@mui/material'
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
            borderRadius: '5px',
            backgroundColor: '#383c45',
          }}>
            <Grid flexDirection='row' container item xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
              <TextField name='buscador' value={buscadorSearch} onChange = {({target}) => setBuscadorSearch(target.value)} label = 'Buscador' type='search' variant='standard' sx={{
                m: 1
              }} />
              <Button color='secondary' sx={{display: 'flex', alignItems: 'end'}} variant='text' onClick={SearchQuestion}>Buscar</Button>
            </Grid>

            {/* <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {2} xl = {2}>
            </Grid> */}
            <Table aria-label="simple table" stickyHeader = {true} sx={{ minWidth: 650, overflow: 'auto', backgroundColor: '#383c45' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Pregunta</TableCell>
                  <TableCell>Id Pregunta</TableCell>
                  <TableCell>Respuesta</TableCell>
                  <TableCell align="right">Dificultad</TableCell>
                  <TableCell align="right">Categor??a</TableCell>
                  <TableCell align="right">Testamento</TableCell>
                  <TableCell align="right">Libro</TableCell>
                  <TableCell align="right">Cap??tulo</TableCell>
                  <TableCell align="right">Desde el versiculo</TableCell>
                  <TableCell align="right">Hasta el versiculo</TableCell>
                  <TableCell align="center">Acci??n</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableQuestionList />
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              labelRowsPerPage = 'Filas por p??gina'
              component="div"
              count={Number(paginacion?.total) || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx = {{color: 'white'}}
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
