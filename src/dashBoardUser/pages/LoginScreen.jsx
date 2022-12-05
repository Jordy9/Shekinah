import React, { useState } from 'react'
import { Login } from '../components/Login';
import { useSelector } from 'react-redux';
import { DialogPartidaPersonalizada } from '../components/DialogPartidaPersonalizada';
import { Button, Grid } from '@mui/material';
import { DashBoardLayaout } from '../layaout/DashBoardLayaout';

export const LoginScreen = () => {

  const [ShowModalPartidaP, setShowModalPartidaP] = useState(false)

  const { uid } = useSelector(state => state.auth);
  
  return (
    <DashBoardLayaout>
      {
        (uid)
          &&
        <Grid container mt={2} p = {2}>
          <Grid display={'flex'} justifyContent = {'center'} xs = {12}>
            <Button variant = 'contained' onClick={() => setShowModalPartidaP(true)}>Configurar partida personalizada</Button>
          </Grid>
        </Grid>
      }

      <Grid container>
        <Grid xs = {12}>
          <Login />
        </Grid>
      </Grid>

      <DialogPartidaPersonalizada ShowDialogPartidaP = {ShowModalPartidaP} setShowDialogPartidaP = {setShowModalPartidaP} />
    </DashBoardLayaout>
  )
}
