import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { themeTheme } from './index'

export const ThemeApp = ({ children }) => {
  return (
    <>
        <ThemeProvider theme={themeTheme}>
            <CssBaseline />
            { children }
        </ThemeProvider>
    </>
  )
}
