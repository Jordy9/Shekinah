import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarTemas, crearTemas } from '../../store/temas/thunk';
import { useState } from 'react';
import { getIsOpen } from '../../store/temas/temasSlice';
import { useEffect } from 'react';

export const DialogTema = () => {

    const dispatch = useDispatch();

    const [tema, setTema] = useState('')

    const { isOpen, temaActivo } = useSelector(state => state.tm);

    const handleClose = () => {
        dispatch(getIsOpen(false))
        setTema('')
    }

    const handleClick = () => {
        document.getElementById('handleSubmitTema').click()
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()

        if ( tema.trim().length <= 1 ) return

        if ( !temaActivo ) {
            dispatch(crearTemas(tema))
            dispatch(getIsOpen(false))
            setTema('')
        } else {
            dispatch(actualizarTemas(tema, temaActivo._id))
        }


    }

    useEffect(() => {
      
        if ( !temaActivo ) return

        setTema(temaActivo.tema)

    }, [temaActivo])

  return (
    <Dialog
        open={ isOpen }
        fullWidth
        maxWidth = 'xs'
        onClose={ handleClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={ 'paper' }
    >
        <DialogTitle id="alert-dialog-title">
          { ( temaActivo ) ? 'Actualizar tema' : 'Crear nuevo tema' }
        </DialogTitle>
        <DialogContent>
            <Box component={ 'form' } onSubmit={ handleSubmit } p={ 2 }>
                <TextField value={ tema } onChange={ ({ target }) => setTema(target.value) } multiline maxRows={ 5 } variant='standard' fullWidth label = 'tema' />
                <button hidden id='handleSubmitTema' type='submit'></button>
            </Box>
        </DialogContent>
        <DialogActions sx={{ px: 2 }}>
            <Button variant='contained' fullWidth onClick={ handleClose }>Cancelar</Button>
            <Button variant='contained' type='submit' fullWidth onClick={ handleClick }>Guardar</Button>
        </DialogActions>
    </Dialog>
  )
}
