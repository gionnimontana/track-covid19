import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import { Filter, Data } from '../Interfaces'
import { getFilterOptions } from '../functions'

interface Props {
  onFilter: (newFilter: Filter) => void
  payload: Data[]
  filter: Filter
}

const DropDown = (props: { label: string, options: string[], value: string | undefined}) => {
  return (
    <FormControl variant="outlined" style={{width: '180px'}}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        onChange={()=>undefined}
        label={props.label}
      >
        <MenuItem value={undefined}>
          <em>None</em>
        </MenuItem>
        {props.options.map(el => (
          <MenuItem value={el}>{el}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const FilterComponent = (p: Props) => {
  const filterOptions = getFilterOptions(p.payload)
  

  return (
    <Paper elevation={1} style={{margin: '15px', width: "100%", padding: '25px', maxWidth: '1280px'}}>
      <Box style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold'}}>Filters</Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
      >
        <DropDown label="Countries" options={filterOptions.countries} value={p.filter.country}/>
        <DropDown label="Company" options={filterOptions.companies} value={p.filter.company}/>
        <DropDown label="Before" options={filterOptions.dates} value={p.filter.date && p.filter.date[0]}/>
        <DropDown label="After" options={filterOptions.dates} value={p.filter.date && p.filter.date[1]}/>
      </Box>
    </Paper>
  )
}

export default FilterComponent