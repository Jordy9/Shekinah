import { createTheme } from "@mui/material";
import { red, purple, indigo,   } from "@mui/material/colors";

// FF0000
// 00FF00
// 0000FF
// 4a148c

export const themeTheme = createTheme({
    palette: {
        primary: {
            main: '#4a148c'
        },
        secondary: {
            main: '#FFFFFF'
        },
        error: {
            main: red.A400
        }
    }
})