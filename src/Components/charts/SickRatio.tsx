import React from 'react'
import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import { AggregatedData } from '../../Interfaces'
import ChartFrame from './ChartFrame'
import { colors } from '../../style'
import CustomTooltip from './CustomTooltip'

interface Props {
  data: AggregatedData[] 
}

interface Aggregated {
  date: string
  sick: number
  infected: number
  quarantine: number
}

const SickRatio = (p: Props) => {
  const data = p.data.reduce((acc: Aggregated[], el) => {
    const totalSum = el.factory + el.home + el.off + el.vacation + el.infected + el.quarantine + el.sick
    const quarantineRatio = totalSum ? el.quarantine / totalSum : 0
    const infectedRatio = totalSum ? el.infected / totalSum : 0
    const sickRatio = totalSum ? el.sick / totalSum : 0
    const aggregate = {
      date: el.date,
      sick: Math.floor(sickRatio * 1000) / 1000,
      infected: Math.floor(infectedRatio * 1000) / 1000,
      quarantine: Math.floor(quarantineRatio * 1000) / 1000,
    }
    return [...acc, aggregate]
  }, [])
  return (
    <ChartFrame title="Sick workers ratio">
      <BarChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(a)=>`${a*100} %`} />
        <Tooltip content={CustomTooltip(true)}/>
        <Legend />
        <Bar dataKey="sick" stackId="a" fill={colors.sick} />
        <Bar dataKey="infected" stackId="a" fill={colors.infected} />
        <Bar dataKey="quarantine" stackId="a" fill={colors.quarantine} />
      </BarChart>
    </ChartFrame>
  );
}

export default SickRatio
