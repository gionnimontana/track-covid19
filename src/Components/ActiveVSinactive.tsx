import React from 'react'
import {  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { AggregatedData } from '../Interfaces'
import ChartFrame from './ChartFrame'

interface Props {
  data: AggregatedData[] 
}

interface Aggregated {
  active: number
  inactive: number
  date: string
}

const ActiveVSinactive = (p: Props) => {
  const data = p.data.reduce((acc: Aggregated[], el) => {
    const aggregate = {
      date: el.date,
      active: el.factory + el.home,
      inactive: el.infected + el.off + el.quarantine + el.sick + el.vacation
    }
    return [...acc, aggregate]
  }, [])
  return (
    <ChartFrame title="Active vs inactive workers">
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
        <Bar dataKey="active" fill="#0a005a" />
        <Bar dataKey="inactive" fill="#27f67a" />
      </BarChart>
    </ChartFrame>
  );
}

export default ActiveVSinactive
