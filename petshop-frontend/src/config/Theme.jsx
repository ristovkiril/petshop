import createTheme from "@mui/material/styles/createTheme";
import {deepPurple, grey} from "@mui/material/colors";

export const theme =
  createTheme({
    root: {
      position: 'absolute',
      height: '100%'
    },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#5271FF',
        contrastText: '#ffffff',
        white: '#ffffff'
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: deepPurple[400]
      },
      neutral: {
        main: '#ffffff',
        gray: '#f4f6f6',
        gray2: '#adadad',
      },
      azure: {
        main: '#1DAEFF',
      },
      confirmation: {
        main: '#09D92A',
        contrastText: '#ffffff',
        dark: "#2FA642"
      },
      purple: {
        main: deepPurple[500],
        light: deepPurple[200],
      }
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      h1: {
        fontFamily: "Inter",
        fontSize: '2.8rem'
      },
      h2: {
        fontFamily: "Inter",
        fontSize: '2.2rem'
      },
      h3: {
        fontFamily: "Inter",
        fontSize: '1.5rem'
      },
      h4: {
        fontFamily: "Inter",
        fontSize: '1.2rem'
      },
      h5: {
        fontFamily: "Inter",
        fontSize: '1rem'
      },
      body1: {
        fontFamily: "Inter",
        fontSize: '0.9rem'
      },
      button: {
        textTransform: "none",
      }

    },
    action: {
      hover: '#1B8EB1',
      active: '#1B8EB1',
    }
  })
