import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import { Data, Stats } from '../Interfaces'
import { getStats } from '../functions'

interface Props {
  payload: Data[]
}

const Header = (p: Props) => {
  const stats: Stats = getStats(p.payload)

  const HighlightBox = (props: {label: string, value: number}) => (
    <Box width="330px" marginBottom="5px" textAlign="center">
      <Card style={{padding: '15px'}}>
        <Box style={{fontSize: '30px'}}>{props.value}</Box>
        <Box style={{marginTop: '10px', fontSize: '18px'}}>{props.label}</Box>
      </Card>
    </Box>
  )

  return (
    <Paper elevation={1} style={{margin: '15px', width: "100%", padding: '25px', maxWidth: '1280px'}}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Box style={{ marginBottom: '22px', fontSize: '20px', fontWeight: 'bold'}}>European Covid-19 tracking dashboard</Box>
        <img src="/logo_minebeamitsumi.png" alt="minibea_logo" height="35px"/>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        marginTop="25px"
        marginBottom="10px"
      >
        <HighlightBox label="Countries" value={stats.countries} />
        <HighlightBox label="Companies" value={stats.companies} />
        <HighlightBox label="Employees" value={stats.employees} />
      </Box>
      <Box marginTop="10px">Last Update: {stats.lastUpdate}</Box>
    </Paper>
  )
}

export default Header