import React, { useEffect, useState } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Box, Typography } from '@mui/material'
import { TableUsersSpreed } from './TableUsersSpreed';
import { useResponsive } from '../../hooks/useResponsive';
import { useDispatch } from 'react-redux';
import { obtenerUsuarios } from '../../store/auth/thunk';

export const TableUsers = () => {

  const dispatch = useDispatch();
  
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [ respWidth ] = useResponsive()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    
    dispatch(obtenerUsuarios())

  }, [dispatch])

  return (
    <Box autoComplete="off" sx={{p: 4}}>
      <Typography marginBottom={5} variant='h5'>Usuarios</Typography>

      <Box>
        <TableContainer elevation = {4} component={Paper} sx={{width: '80vw', height: '400px', mx: 'auto', mt: 2, borderTopLeftRadius: '20px', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
          <Table aria-label="simple table" stickyHeader = {true}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Foto</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Correo electrónico</TableCell>
                <TableCell align="center">Puntos</TableCell>
                <TableCell align="center">Aciertos</TableCell>
                <TableCell align="center">Errores</TableCell>
                <TableCell align="center">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableUsersSpreed />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{width: '80vw', mx: 'auto', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '20px'}}
          labelRowsPerPage = {(respWidth > 991) ? 'Filas por página' : 'Filas'}
          labelDisplayedRows = {({ from, to, count }) => `${from}-${to} de ${count}`}
          rowsPerPageOptions={[10, 25, 100]}
          component={Paper}
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}
