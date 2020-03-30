import React, { ReactNode } from 'react'
import Paper from '@material-ui/core/Paper'
import { ResponsiveContainer } from 'recharts'
import Box from '@material-ui/core/Box'
import withWidth from '@material-ui/core/withWidth'

interface Props {
  children?: ReactNode
  title: string
  width?: string
}

const ChartFrame = (p: Props) => {
  const isSmallScreen = p.width === 'xs' || p.width === 'sm'
  const width = isSmallScreen ? '100%' : '600px'
  return (
    <Paper elevation={1} style={{margin: '15px', padding: '25px', width}}>
      <Box style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold'}}>{p.title}</Box>
      <Box>
      <ResponsiveContainer
        width="100%"
        height={280}
      >
        {p.children}
      </ResponsiveContainer>
      </Box>
    </Paper>
  )
}

export default withWidth()(ChartFrame)