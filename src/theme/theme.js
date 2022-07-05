import { createTheme } from "@mui/material";
import { red, purple, indigo  } from "@mui/material/colors";

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