import { Box, TableCell, TableRow } from '@mui/material'
import React from 'react'
import user from '../../heroes/user.webp'

export const TableContent = (props) => {

    const { name, juego, avatar } = props

    const { name: nameAvatar, category, backGround, radius, flip, rotate, translateX, translateY } = avatar

  return (
    <TableRow
      key={name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
    >
      <TableCell style = {{verticalAlign: 'middle', display: 'flex', justifyContent: 'center'}} align='center' component="th" scope="row">
        <Box sx={{overflow: 'hidden'}}>
          <img loading="lazy" src={`https://avatars.dicebear.com/api/${category}/:${nameAvatar || name}.svg`} 
            style = {{
                backgroundColor: backGround, 
                width: '50px', 
                height: '50px', 
                borderRadius: `${radius}%`,
                transform: 
                  `rotate(${rotate}deg) 
                  translateX(${translateX}%) 
                  translateY(${translateY}%) 
                  scaleX(${(flip) ? '-1' : '1'})`,
            }}
            alt="" />
        </Box>
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
