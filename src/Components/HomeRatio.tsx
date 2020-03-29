import React from 'react'
import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { AggregatedData } from '../Interfaces'
import ChartFrame from './ChartFrame'

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
    const homeRatio = el.home / totalSum
    const aggregate = {
      date: el.date,
      home: Math.floor(homeRatio * 1000) / 1000
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
        <Bar dataKey="home" fill="#0a005a" />
      </BarChart>
    </ChartFrame>
  );
}

export default HomeRation
