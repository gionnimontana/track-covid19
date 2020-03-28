import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import mainTheme from './style'
import './style/index.css'
import Overview from './Components/Overview'
import apiPayload from './data/data.json'
import { Data } from './Interfaces'
import { aggregateDate } from './functions'
import HomeVsOnplace from './Components/ActiveVSinactive'

const App = () => {

  const data: Data[] = apiPayload.data
  const aggregatedData =  aggregateDate(data)

  return (
    <ThemeProvider theme={mainTheme}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Overview data={aggregatedData}/>
        <HomeVsOnplace data={aggregatedData}/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
