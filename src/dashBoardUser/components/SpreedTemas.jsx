import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useResponsive } from '../../hooks/useResponsive';
import { TableQuestionListTemas } from '../../dashBoard/components/TableQuestionListTemas';
import { DialogTema } from '../../dashBoard/components/DialogTema';
import { obtenerTemas, obtenerTemasMas } from '../../store/temas/thunk';
import { getIsOpen } from '../../store/temas/temasSlice';

export const SpreedTemas = () => {

    const { paginacion } = useSelector(state => state.tm);
  
    const [page, setPage] = useState(0);
  
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const dispatch = useDispatch();
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      dispatch(obtenerTemas(1, +event.target.value))
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
      dispatch(obtenerTemasMas(newPage + 1, rowsPerPage))
    };
  
    const [buscadorSearch, setBuscadorSearch] = useState()
  
    const SearchQuestion = () => {
      dispatch(obtenerTemas(1, rowsPerPage, buscadorSearch))
    }
  
    const [ respWidth ] = useResponsive()

  return (
    <Box autoComplete="off" sx={{px: 4, mt: 2}}>
      <Typography marginBottom={ 2 } variant='h5'>Listado de temas</Typography>

      <Grid display={ 'flex' } justifyContent={ 'end' }>
        <Button variant='contained' onClick={ () => dispatch(getIsOpen(true)) }>Crear tema</Button>
      </Grid>

      <Box>

          <TableContainer elevation = {4} component={Paper} sx={{width: '40%', height: '400px', mx: 'auto', mt: 2, borderTopLeftRadius: '20px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
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
                  <TableCell>Tema</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableQuestionListTemas />
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            sx={{width: '40%', mx: 'auto', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '20px'}}
            rowsPerPageOptions={[10, 20, 30]}
            labelRowsPerPage = {(respWidth > 991) ? 'Filas por página' : 'Filas'}
            labelDisplayedRows = {({ from, to, count }) => `${from}-${to} de ${count}`}
            component={Paper}
            count={Number(paginacion?.count) || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
      </Box>

      <DialogTema />
    </Box>
  )
}
