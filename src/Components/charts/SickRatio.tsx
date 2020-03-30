import React from 'react'
import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { AggregatedData } from '../../Interfaces'
import ChartFrame from '../ChartFrame'
import { colors } from '../../style'

interface Props {
  data: AggregatedData[] 
}

interface Aggregated {
  date: string
  sick: number
}

const SickRatio = (p: Props) => {
  const data = p.data.reduce((acc: Aggregated[], el) => {
    const totalSum = el.factory + el.home + el.off + el.vacation + el.infected + el.quarantine + el.sick
    const quarantineRatio = el.quarantine / totalSum
    const infectedRatio = el.infected / totalSum
    const sickRatio = el.sick / totalSum
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
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sick" stackId="a" fill={colors.sick} />
        <Bar dataKey="infected" stackId="a" fill={colors.infected} />
        <Bar dataKey="quarantine" stackId="a" fill={colors.quarantine} />
      </BarChart>
    </ChartFrame>
  );
}

export default SickRatio
