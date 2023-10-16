import { Avatar, Box, TableCell, TableRow } from '@mui/material'
import React from 'react'

export const TableContent = (props) => {

    const { name, juego, avatar, id } = props

    const { name: nameAvatar, category, backGround, radius, flip, rotate, translateX, translateY } = avatar

    const isCCbs = ( id === '652469d52449387ebbff39da' ) && 'https://yt3.ggpht.com/mf1VTcWGDbw6SnUd1sBFdLFD-Y1LxrJpPWAcqoCZ-9xBOx7UDevKXkzGpxLzotTDFNM5zQCcWg=s176-c-k-c0x00ffffff-no-rj-mo'

  return (
    <TableRow
      key={name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
    >
      <TableCell size='small' style = {{verticalAlign: 'middle', display: 'flex', justifyContent: 'center'}} align='center' component="th" scope="row">
        <Box sx={{overflow: 'hidden'}}>
          {
            ( isCCbs )
              ?
            <Avatar src={ isCCbs } variant='circular' sx={{ width: '50px', height: '50px' }} />
              :
            <Avatar src={`https://api.dicebear.com/7.x/${category}/svg?seed=${nameAvatar || name}`} 
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
          }
        </Box>
      </TableCell>       

      <TableCell size='small' style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
        {name}
      </TableCell>       

      <TableCell size='small' style = {{verticalAlign: 'middle'}} align='center' component="th" scope="row">
        {juego?.puntos || 0}
      </TableCell>       
    </TableRow>
  )
}
