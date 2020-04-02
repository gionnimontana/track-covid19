import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#0066b3',
      light: '#3d3d3d',
      dark: '#0b5185',
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
  vacation: "#82ca9d",
  off: "#8884d8",
  quarantine: "#53565A",
  sick: "#ed1c24",
  infected: "#000",
}