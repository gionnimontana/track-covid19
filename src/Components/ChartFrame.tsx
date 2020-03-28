import React, { ReactNode } from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

interface Props {
  children?: ReactNode
  title: string
}

const ChartFrame = (p: Props) => {
  return (
    <Paper elevation={1} style={{margin: '15px', width: "600px", padding: '25px'}}>
      <Box style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold'}}>{p.title}</Box>
      <Box>
        {p.children}
      </Box>
    </Paper>
  )
}

export default ChartFrame