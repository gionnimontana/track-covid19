import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { Data } from '../Interfaces'

interface Props {
  payload: Data[]
}

const Header = (p: Props) => {

  return (
    <Paper elevation={1} style={{margin: '15px', width: "100%", padding: '25px', maxWidth: '1280px'}}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Box style={{ marginBottom: '22px', fontSize: '20px', fontWeight: 'bold'}}>Covid-19 tracking dashboard</Box>
        <img src="https://www.minebeamitsumi.com/english/common/img/logo_minebeamitsumi.png" alt="minibea_logo" height="35px"/>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
      >
      </Box>
    </Paper>
  )
}

export default Header