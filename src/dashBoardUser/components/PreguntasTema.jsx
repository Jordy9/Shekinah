import { Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerPreguntasPorTema } from '../../store/preguntas/thunk';
import { useState } from 'react';

export const PreguntasTema = ({ temas, preguntasTOGame, setPreguntasTOGame }) => {

    const { preguntasTema } = useSelector(state => state.tm);

    const dispatch = useDispatch();

    const [values, setValues] = useState([])

    const handleSubmitByTema = ( value ) => {
        dispatch(obtenerPreguntasPorTema(value, setValues))
    }

    const handleChange = ( _id ) => {

        if ( preguntasTOGame.find( e => e === _id ) ) {

            const pregunta = preguntasTOGame.filter( e  => e !== _id )

            setPreguntasTOGame(pregunta)
        } else {
            setPreguntasTOGame((prev) => ([ ...prev, _id ]))
        }
        
    }

  return (
    <>
        <Grid mt={ 2 } container columnSpacing={ 2 }>
            <Grid item xs={ 12 }>
                <TextField select fullWidth label='Tema'>
                    {
                        temas.map( e => (
                            <MenuItem onClick={ () => handleSubmitByTema(e.tema) } key={ e._id } value={e.tema}>{ e.tema }</MenuItem>
                        ))
                    }
                </TextField>
            </Grid>
        </Grid>
        
        <Grid mt={ 2 } container columnSpacing={ 2 }>
            <Grid item xs={ 12 }>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-checkbox-label">Preguntas</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={ values.filter( e => preguntasTOGame.some( a => a === e._id ) )}
                            input={<OutlinedInput label="Preguntas" />}
                            renderValue={(selected) => selected.map( e => e.pregunta ).join(', ')}
                            // MenuProps={MenuProps}
                        >
                        {
                            ( values.length !== 0 )
                                &&
                            values?.map(({ _id, pregunta }) => (
                                <MenuItem onClick={ () => handleChange(_id) } key={_id} value={_id}>
                                    <Checkbox checked={preguntasTOGame?.findIndex( e => e === _id ) > -1} />
                                    <ListItemText primary={pregunta} />
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    </>
  )
}
