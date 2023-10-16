import { ArrowBackIos, ArrowForwardIos, QuestionAnswer } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

export const ButtonNavigationQuestions = ({ prev, nextForward, preguntaNo, show, change, response, onClick, showCorrect, DissabledToSelect }) => {
  return (
    <>
        {
            ( !show && change > 0 )
                &&
            <Button sx={{  boxShadow: 12 }} startIcon={ <ArrowBackIos /> } variant='contained' onClick={prev}>
                Anterior
            </Button>
        }

        {
            ( DissabledToSelect && preguntaNo > change && !response )
                &&
            <Button sx={{ ml: 'auto', boxShadow: 12 }} endIcon={ <ArrowForwardIos /> } variant='contained' onClick={nextForward}>
                Siguiente
            </Button>
        }

        {
            (response && !show)
                &&
            <Button sx={{ ml: 'auto', boxShadow: 12 }} endIcon={ <QuestionAnswer /> } hidden = {show} onClick={() => onClick(response)} variant='contained'>Responder</Button>
        }
    </>
  )
}
