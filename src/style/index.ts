import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
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
  warning: '#bfce43',
  alarm: '#d14949',
  regular: '#4fc469',
  darkGrey: '#7e7e7e',
  lightGrey: '#e5e5e5',
  disconnected: '#888888',
}

export const containerStyle = {
  maxWidth: '1152px',
  marginTop: '15px',
  marginBottom: '15px',
  margin: 'auto',
}
