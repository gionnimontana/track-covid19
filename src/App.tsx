import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import mainTheme from './style'
import './style/index.css'
import Overview from './Components/charts/Overview'
import apiPayload from './data/data.json'
import { Data, AggregatedData, Filter } from './Interfaces'
import { aggregateDate } from './functions'
import HomeVsOnplace from './Components/charts/ActiveVSinactive'
import SickRatio from './Components/charts/SickRatio'
import HomeRatio from './Components/charts/HomeRatio'
import FilterComponent from './Components/FilterComponent'
import Header from './Components/Header'

const App = () => {
  const initFilter: Filter = { countries: [], companies: [], date: []}
  const [payload, setPayload] = React.useState<Data[]>([])
  const [data, setData] = React.useState<AggregatedData[]>([])
  const [filter, setFilter] = React.useState<Filter>(initFilter)

  React.useEffect(() => {
    const payload: Data[] = apiPayload
    setPayload(payload)
  }, [])

  React.useEffect(() => {
    const aggregatedData =  aggregateDate(payload, filter)
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
        <Header payload={payload}/>
        <FilterComponent onFilter={onFilter} payload={payload} filter={filter}/>
        <Overview data={data}/>
        <HomeVsOnplace data={data}/>
        <SickRatio data={data} />
        <HomeRatio data={data} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
