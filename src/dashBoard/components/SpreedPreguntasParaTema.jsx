import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useResponsive } from '../../hooks/useResponsive';
import { TableQuestionListPreguntasParaTema } from './TableQuestionListPreguntasParaTema';
import { DialogPreguntaParaTema } from './DialogPreguntaParaTema';
import { getIsOpen } from '../../store/preguntasTema/preguntasTemaSlice';
import { obtenerPreguntasTema } from '../../store/preguntasTema/thunk';

export const SpreedPreguntasParaTema = () => {

    const { paginacion } = useSelector(state => state.pgt);
  
    const [page, setPage] = useState(0);
  
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const dispatch = useDispatch();
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      dispatch(obtenerPreguntasTema(1, +event.target.value))
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
      dispatch(obtenerPreguntasTema(newPage + 1, rowsPerPage))
    };
  
    const [buscadorSearch, setBuscadorSearch] = useState()
  
    const SearchQuestion = () => {
      dispatch(obtenerPreguntasTema(1, rowsPerPage, buscadorSearch))
    }
  
    const [ respWidth ] = useResponsive()

    useEffect(() => {
      
      dispatch(obtenerPreguntasTema())

    }, [dispatch])

  return (
    <Box autoComplete="off" sx={{px: 4, mt: 2}}>
      <Typography marginBottom={ 2 } variant='h5'>Listado de preguntas</Typography>

      <Grid display={ 'flex' } justifyContent={ 'end' }>
        <Button variant='contained' onClick={ () => dispatch(getIsOpen(true)) }>Crear pregunta</Button>
      </Grid>

      <Box>
          <TableContainer elevation = {4} component={Paper} sx={{width: 'auto', height: '400px', mx: 'auto', mt: 2, borderTopLeftRadius: '20px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
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
                  <TableCell>Nota</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableQuestionListPreguntasParaTema />
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{width: 'auto', mx: 'auto', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '20px'}}
            rowsPerPageOptions={[10, 20, 30]}
            labelRowsPerPage = {(respWidth > 991) ? 'Filas por página' : 'Filas'}
            labelDisplayedRows = {({ from, to, count }) => `${from}-${to} de ${count}`}
            component={Paper}
            count={Number(paginacion?.count) || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Box>

      <DialogPreguntaParaTema />
    </Box>
  )
}