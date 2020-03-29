import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { AggregatedData } from '../Interfaces'
import ChartFrame from '../Components/ChartFrame'

interface Props {
  data: AggregatedData[] 
}

const Overview = (p: Props) => {
  return (
    <ChartFrame title="Workers location overview">
      <BarChart 
        width={600} 
        height={300} 
        data={p.data}
        margin={{top: 20, right: 30, left: 20, bottom: 5}}
      >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="date"/>
      <YAxis/>
      <Tooltip/>
      <Legend />
      <Bar dataKey="factory" stackId="a" fill="#295ef4" />
      <Bar dataKey="home" stackId="a" fill="#0a005a" />
      <Bar dataKey="vacation" stackId="a" fill="#a7ffca" />
      <Bar dataKey="off" stackId="a" fill="#27f67a" />
      <Bar dataKey="quarantine" stackId="a" fill="#18c75e" />
      <Bar dataKey="sick" stackId="a" fill="#0c9c46" />
      <Bar dataKey="infected" stackId="a" fill="#025e27" />
      </BarChart>
    </ChartFrame>
  );
}

export default Overview
