import React, { useState } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination, Avatar, Box, Typography } from '@mui/material'
import { TableUsersSpreed } from './TableUsersSpreed';

  
  export const TableUsers = () => {
  
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box autoComplete="off" sx={{p: 4}}>
      <Typography marginBottom={5} variant='h5'>Usuarios</Typography>

      <Box sx={{p: 3}}>

        <TableContainer elevation = {4} component={Paper} sx = {{
          height: 400,
          borderRadius: '20px',
        }}>
          <Table aria-label="simple table" stickyHeader = {true} sx={{ minWidth: 650, overflow: 'auto'}}>
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
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={10}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  )
}
