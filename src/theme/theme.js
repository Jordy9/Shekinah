import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const tema = localStorage.getItem('tema') || '#4a148c'

export const themeTheme = createTheme({
    palette: {
        primary: {
            main: tema
        },
        secondary: {
            main: '#FFFFFF'
        },
        error: {
            main: red.A400
        }
    }
})