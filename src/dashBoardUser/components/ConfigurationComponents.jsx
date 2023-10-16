import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

export const ConfigurationComponents = ({ showPregunta, getFieldProps, Categoria, Dificultad, Preguntas, setFormId, formId }) => {

    const [ respWidth ] = useResponsive();

  return (
    <>
        {
            (!showPregunta)
                ?
            <>
                <Grid container p={3} display = {'flex'} justifyContent = {'center'}>
                    <Grid xs = {12} sm = {12} md = {12} lg = {4} xl = {4}>
                        <TextField fullWidth {...getFieldProps('categoria')} variant = 'standard' label = 'Categoría' select>
                        {Categoria.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>

                    <Grid sx = {{mx: (respWidth > 991) && 1}} xs = {12} sm = {12} md = {12} lg = {3} xl = {3}>

                        <TextField fullWidth {...getFieldProps('dificultad')} variant = 'standard' label = 'Dificultad' select>
                        {Dificultad.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>

                    <Grid xs = {12} sm = {12} md = {12} lg = {4} xl = {4}>

                        <TextField fullWidth {...getFieldProps('pregunta')} variant = 'standard' label = 'Preguntas' select>
                        {Preguntas.map((option) => (
                            <MenuItem selected key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                </Grid>

                <Button id='buttonSubmitPartidaPersonalizada' hidden type='submit'></Button>
            </>
                :
            <>
                <Typography variant='h6'>Para pruebas</Typography>
                <Typography variant = 'body2'>Si desea buscar por rango siga esta sintaxis: 1-5 o 100-110</Typography>
                <Typography variant = 'body2'>Si desea buscar por ids especificos siga esta sintaxis: 1,5,7,15,20</Typography>
                <Grid container py = {2}>
                    <Grid xs = {12}>
                        <TextField value={formId} onChange = {(e) => setFormId(e.target.value)} variant = 'standard' label = 'Id de la pregunta' />
                    </Grid>
                </Grid>
            </>
        }
    </>
  )
}
