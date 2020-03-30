import React from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { Filter, Data, FilterOption } from '../Interfaces'
import { getFilterOptions } from '../functions'
// @ts-ignore
import DropDown from 'react-select'

interface Props {
  onFilter: (newFilter: Filter) => void
  payload: Data[]
  filter: Filter
}

const FilterComponent = (p: Props) => {
  const filterOptions = getFilterOptions(p.payload, p.filter.countries)
  const countryOptions: FilterOption[] = filterOptions.countries
  const factoryOptions: FilterOption[] = filterOptions.companies
  const dateOptions: FilterOption[] = filterOptions.date

  const addFilter = (field: keyof Filter) => (payload: FilterOption[]) => {
    const newFilter: Filter = { ...p.filter}
    newFilter[field] = payload || []
    if (field === "countries") newFilter.companies = []
    p.onFilter(newFilter)
  }

  return (
    <Paper elevation={1} style={{margin: '15px', width: "100%", padding: '25px', maxWidth: '1280px'}}>
      <Box style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold'}}>Filters</Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
      >
        <Box width="330px" marginBottom="5px">
          <DropDown
            value={p.filter.countries}
            onChange={addFilter('countries')}
            options={countryOptions}
            isMulti={true}
            isSearchable={true}
            placeholder="Filter by country (show all if empty)"
          />
        </Box>
        <Box width="330px" marginBottom="5px">
          <DropDown
            value={p.filter.companies}
            onChange={addFilter('companies')}
            options={factoryOptions}
            isMulti={true}
            isSearchable={true}
            placeholder="Filter by company (show all if empty)"
          />
        </Box>
        <Box width="330px" marginBottom="5px">
          <DropDown
            value={p.filter.date}
            onChange={addFilter('date')}
            options={dateOptions}
            isMulti={true}
            isSearchable={true}
            placeholder="Filter by date (show all if empty)"
          />
        </Box>
      </Box>
    </Paper>
  )
}

export default FilterComponent