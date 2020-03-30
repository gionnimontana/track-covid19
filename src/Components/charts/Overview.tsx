import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { AggregatedData } from '../../Interfaces'
import ChartFrame from './ChartFrame'
import { colors } from '../../style'
import CustomTooltip from './CustomTooltip'

interface Props {
  data: AggregatedData[] 
}

const Overview = (p: Props) => {
  return (
    <ChartFrame title="Workers location overview">
      <BarChart 
        data={p.data}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}
      >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="date"/>
      <YAxis/>
      <Tooltip content={CustomTooltip(false)}/>
      <Legend />
      <Bar dataKey="factory" stackId="a" fill={colors.factory} />
      <Bar dataKey="home" stackId="a" fill={colors.home} />
      <Bar dataKey="vacation" stackId="a" fill={colors.vacation} />
      <Bar dataKey="off" stackId="a" fill={colors.off} />
      <Bar dataKey="sick" stackId="a" fill={colors.sick} />
      <Bar dataKey="quarantine" stackId="a" fill={colors.quarantine} />
      <Bar dataKey="infected" stackId="a" fill={colors.infected} />
      </BarChart>
    </ChartFrame>
  );
}

export default Overview
