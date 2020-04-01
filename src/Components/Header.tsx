import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { Data, Stats } from '../Interfaces'
import { getStats } from '../functions'
import withWidth from '@material-ui/core/withWidth'
import { colors } from '../style'

interface Props {
  payload: Data[]
  width?: string
}

const Header = (p: Props) => {
  const stats: Stats = getStats(p.payload)
  const isSmallScreen = p.width === 'xs' || p.width === 'sm'

  const HighlightBox = (props: {label: string, value: number}) => (
    <Box width="330px" textAlign="center">
      <Box style={{fontSize: '30px', color: colors.factory, fontWeight: 'bold'}}>{props.value}</Box>
      <Box style={{fontSize: '18px'}}>{props.label}</Box>
    </Box>
  )

  const Header = () => (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="end"
    >
      <Box style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 'bold' }}>MinebeaMitsumi Europe Covid-19 tracking dashboard</Box>
      <img src="/logo_minebeamitsumi.png" alt="minibea_logo" height="35px"/>
    </Box>
  )

  const MobileHeader = () => (
    <Box textAlign="center">
      <img src="/logo_minebeamitsumi.png" alt="minibea_logo" height="35px"/>
      <Box style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 'bold', marginTop: '22px'}}>
        MinebeaMitsumi Europe Covid-19 tracking dashboard
      </Box>
    </Box>
  )

  return (
    <Paper elevation={1} style={{margin: '8px', width: "100%", padding: '15px', maxWidth: '1280px'}}>
      {isSmallScreen ? <MobileHeader/> : <Header/>}
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        marginTop="15px"
        marginBottom="15px"
      >
        <HighlightBox label="Countries" value={stats.countries} />
        <HighlightBox label="Companies" value={stats.companies} />
        <HighlightBox label="Employees" value={stats.employees} />
      </Box>
      <Box
        fontSize="14px"
        style={
          isSmallScreen
          ? {textAlign: 'center'}
          : {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}
        }
      >
        <Box>Last Update: {stats.lastUpdate}</Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          marginTop={isSmallScreen ? '10px' : '0px'}
        >
          <Box fontStyle="italic" color="#9d9d9d">Powered by</Box>
          <img src="/logo_paradox-min.jpg" alt="minibea_logo" width="135px"/>
        </Box>
      </Box>
    </Paper>
  )
}

export default withWidth()(Header)