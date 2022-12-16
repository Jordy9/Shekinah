import { PlayCircle, Settings } from '@mui/icons-material'
import { Avatar, BottomNavigation, BottomNavigationAction, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import user from '../../heroes/user.webp'
import { obtenerPreguntasJuego } from '../../store/preguntas/thunk'
import { DialogPartidaPersonalizada } from './DialogPartidaPersonalizada'
import { TablaSpreedList } from './TablaSpreedList'

export const TablaPosiciones = () => {

    const dispatch = useDispatch();

    const { usuarioActivo } = useSelector(state => state.auth);

    const [ShowModalPartidaP, setShowModalPartidaP] = useState(false)

    const comenzarJuegoRapido = () => {
      dispatch(obtenerPreguntasJuego())
    }

    const navigate = useNavigate()

    const { name, category, backGround, radius, flip, rotate, translateX, translateY } = usuarioActivo?.avatar

  return (
    <Box display={'flex'} alignItems={'center'} sx = {{height: '80vh'}}>
      <TableContainer sx={{width: '70vw', height: '500px', mx: 'auto', mt: 2, borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'}} component={Paper}>
          <Grid p={2} display={'flex'} justifyContent = 'space-between' alignItems={'center'}>
              <Typography variant='h5' textAlign={'center'}>Top 10</Typography>
              <Grid display={'flex'} justifyContent = 'space-between' alignItems={'center'} sx = {{cursor: 'pointer'}} onClick={() => navigate('/Perfil')}>
                  <Grid mx={1} display = {'flex'} justifyContent = {'center'} sx = {{overflow: 'hidden'}}>
                    <Avatar src={`https://avatars.dicebear.com/api/${category}/:${name || usuarioActivo?.name}.svg`} 
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
                  </Grid>
                  <Typography variant='h5'>{usuarioActivo?.name}</Typography>
              </Grid>
          </Grid>
        <Table aria-label="simple table" stickyHeader = {true}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Imagen</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Puntos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TablaSpreedList />
          </TableBody>
        </Table>

        <DialogPartidaPersonalizada ShowDialogPartidaP = {ShowModalPartidaP} setShowDialogPartidaP = {setShowModalPartidaP} />
      </TableContainer>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          sx = {{display: 'flex', justifyContent: 'space-between', backgroundColor: 'primary.main'}}
          showLabels
        >
          <BottomNavigationAction onClick={() => setShowModalPartidaP(true)} sx = {{color: 'white'}} label="Configurar Partida" icon={<Settings />} />
          <BottomNavigationAction onClick={comenzarJuegoRapido} sx = {{color: 'white'}} label="Jugar" icon={<PlayCircle />} />
        </BottomNavigation>
      </Paper>

    </Box>
  )
}
