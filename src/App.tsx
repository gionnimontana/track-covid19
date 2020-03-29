import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import mainTheme from './style'
import './style/index.css'
import Overview from './Components/Overview'
import apiPayload from './data/data.json'
import { Data, AggregatedData, Filter } from './Interfaces'
import { aggregateDate } from './functions'
import HomeVsOnplace from './Components/ActiveVSinactive'
import SickRatio from './Components/SickRatio'
import HomeRatio from './Components/HomeRatio'
import FilterComponent from './Components/FilterComponent'

const App = () => {
  const [payload, setPayload] = React.useState<Data[]>([])
  const [data, setData] = React.useState<AggregatedData[]>([])
  const [filter, setFilter] = React.useState<Filter>({})

  React.useEffect(() => {
    const payload: Data[] = apiPayload
    setPayload(payload)
  }, [])

  React.useEffect(() => {
    const aggregatedData =  aggregateDate(payload)
    setData(aggregatedData)
  }, [payload, filter])

  const onFilter = (newFilter: Filter) => {
    setFilter(newFilter)
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        <FilterComponent onFilter={onFilter}/>
        <Overview data={data}/>
        <HomeVsOnplace data={data}/>
        <SickRatio data={data} />
        <HomeRatio data={data} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
