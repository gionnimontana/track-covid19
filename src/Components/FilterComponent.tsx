import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import { Filter } from '../Interfaces'

interface Props {
  onFilter: (newFilter: Filter) => void
}

const DropDown = (props: { label: string}) => {
  return (
    <FormControl variant="outlined" style={{width: '180px'}}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={10}
        onChange={()=>undefined}
        label={props.label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  )
}

const FilterComponent = (p: Props) => {
  return (
    <Paper elevation={1} style={{margin: '15px', width: "100%", padding: '25px', maxWidth: '1280px'}}>
      <Box style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold'}}>Filters</Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
      >
        <DropDown label="Countries"/>
        <DropDown label="Company"/>
        <DropDown label="Before"/>
        <DropDown label="After"/>
      </Box>
    </Paper>
  )
}

export default FilterComponent