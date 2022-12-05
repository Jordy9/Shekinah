import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import user from '../../heroes/user.webp'

export const TableContent = (props) => {

    const { name, juego } = props

  return (
    <TableRow
      key={name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
    >
      <TableCell style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
        <img src={user} style = {{width: '50px', height: '50px', clipPath: 'circle()'}} alt="" />
      </TableCell>       

      <TableCell style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
        {name}
      </TableCell>       

      <TableCell style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
        {juego?.puntos || 0}
      </TableCell>       
    </TableRow>
  )
}
