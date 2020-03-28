import React from 'react'
import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { AggregatedData } from '../Interfaces'
import ChartFrame from './ChartFrame'

interface Props {
  data: AggregatedData[] 
}

interface Aggregated {
  active: number
  inactive: number
}

const ActiveVSinactive = (p: Props) => {
  const data = p.data.reduce((acc: Aggregated[], el) => {
    const aggregate = {
      active: el.factory + el.home,
      inactive: el.infected + el.off + el.quarantine + el.sick + el.vacation
    }
    return [...acc, aggregate]
  }, [])
  return (
    <ChartFrame title="Active vs inactive workers">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="active" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="inactive" stroke="#82ca9d" />
      </LineChart>
    </ChartFrame>
  );
}

export default ActiveVSinactive
