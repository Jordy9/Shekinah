import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
// import { themeTheme } from './index'
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { useSelector } from 'react-redux'

export const ThemeApp = ({ children }) => {

  const { usuarioActivo } = useSelector(state => state.auth);

  const tema = localStorage.getItem('tema') || '#4a148c'

  const selected = localStorage.getItem('selected') || '#4a148c'

  let themeTheme = createTheme({
      palette: {
          primary: {
              main: usuarioActivo?.tema || tema
          },
          secondary: {
              main: '#FFFFFF'
          },
          info: {
              main: '#008080'
          },
          warning: {
              main: usuarioActivo?.selected || selected
          },
          error: {
              main: red.A400
          }
      }
  })

  return (
    <>
        <ThemeProvider theme={themeTheme}>
            <CssBaseline />
            { children }
        </ThemeProvider>
    </>
  )
}
