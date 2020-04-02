import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import axios from 'axios'
import mainTheme from './style'
import Overview from './Components/charts/Overview'
import { Data, AggregatedData, Filter } from './Interfaces'
import { aggregateDate } from './functions'
import HomeVsOnplace from './Components/charts/ActiveVSinactive'
import SickRatio from './Components/charts/SickRatio'
import HomeRatio from './Components/charts/HomeRatio'
import FilterComponent from './Components/FilterComponent'
import ViewHandler from './Components/ViewHandler'
import Header from './Components/Header'
import './style/index.css'

import TableComponent from './Components/table/TableComponent'
const App = () => {
  const initFilter: Filter = { countries: [], companies: [], date: []}
  const [payload, setPayload] = React.useState<Data[]>([])
  const [data, setData] = React.useState<AggregatedData[]>([])
  const [filter, setFilter] = React.useState<Filter>(initFilter)
  const [view, setView] = React.useState<'table' | 'charts'>('charts')

  React.useEffect(() => {
    const fetchData = async () => {
      const payload = await axios.get('/data/data.json')
      setPayload(payload.data as Data[])
    }
    fetchData()
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
        <ViewHandler 
          view={view}
          setView={setView}
          filter={<FilterComponent onFilter={onFilter} payload={payload} filter={filter}/>}
        />
        {view === 'charts' && [
          <Overview data={data} key={1}/>,
          <HomeVsOnplace data={data} key={2}/>,
          <SickRatio data={data} key={3}/>,
          <HomeRatio data={data} key={4}/>
        ]}
        {view === 'table' && <TableComponent/>}
      </Box>
    </ThemeProvider>
  );
}

export default App;
