import React from 'react'
import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { AggregatedData } from '../Interfaces'
import ChartFrame from './ChartFrame'

interface Props {
  data: AggregatedData[] 
}

interface Aggregated {
  date: string
  sick: number
}

const SickRatio = (p: Props) => {
  const data = p.data.reduce((acc: Aggregated[], el) => {
    const sickSum = el.infected + el.quarantine + el.sick
    const totalSum = el.factory + el.home + el.off + el.vacation + sickSum
    const sickRatio = sickSum / totalSum
    const aggregate = {
      date: el.date,
      sick: Math.floor(sickRatio * 1000) / 1000
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
        <Bar dataKey="sick" fill="#27f67a" />
      </BarChart>
    </ChartFrame>
  );
}

export default SickRatio
