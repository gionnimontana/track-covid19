import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#0066b3',
      light: '#3d3d3d',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#8a8a8a',
      light: '#a3a3a3',
      dark: '#5c5c5c',
      contrastText: '#fff',
    },
    error: {
      main: '#d14949',
      light: '#df7272',
      dark: '#9d3434',
      contrastText: '#fff',
    },
  },
})

export const colors = {
  factory: "#0066b3",
  home: "#0a005a",
  vacation: "#63747A",
  off: "#ed1c24",
  quarantine: "#53565A",
  sick: "#F6A21E",
  infected: "#4F0000",
}