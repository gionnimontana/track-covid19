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
  home: number
}

const HomeRation = (p: Props) => {
  const data = p.data.reduce((acc: Aggregated[], el) => {
    const totalSum = el.factory + el.home + el.off + el.vacation + el.infected + el.quarantine + el.sick
    const homeRatio = totalSum ? el.home / totalSum : 0
    const factoryRatio = totalSum ? el.factory / totalSum: 0
    const aggregate = {
      date: el.date,
      home: Math.floor(homeRatio * 1000) / 1000,
      factory: Math.floor(factoryRatio * 1000) / 1000
    }
    return [...acc, aggregate]
  }, [])
  return (
    <ChartFrame title="Active workers ratio">
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
        <Bar dataKey="home" stackId="a" fill={colors.home} />
        <Bar dataKey="factory" stackId="a" fill={colors.factory} />
      </BarChart>
    </ChartFrame>
  );
}

export default HomeRation
