import { Data, AggregatedData, FilterOption, Filter, Stats } from '../Interfaces'
import moment from 'moment'

export const aggregateDate = (data: Data[], filter: Filter): AggregatedData[] => {
  return data.reduce((acc: AggregatedData[], day) => {

    const filterContainDate = filter.date.find(el => el.value === day.date)
    if (filter.date.length > 0 && !filterContainDate) return acc

    const date = moment(day.date).format('DD-MM')
    let factory = 0
    let home = 0
    let vacation = 0
    let off = 0
    let quarantine = 0
    let sick = 0
    let infected = 0
    day.companies.forEach(el => {

      const filterContainCountry = filter.countries.find(c => c.value === el.country)
      const filterContainCompany = filter.companies.find(c => c.value === el.company)
      const filterCountry = filter.countries.length > 0 && !filterContainCountry
      const filterCompany = filter.companies.length > 0 && !filterContainCompany
      if (filterCountry || filterCompany) return

      factory += el.absData.people_factory
      home += el.absData.people_home
      vacation += el.absData.people_vacation
      off += el.absData.people_off
      quarantine += el.absData.people_quarantine
      sick += el.absData.people_sick
      infected += el.absData.people_infected
    })
    return [...acc, {
      date, factory, home, vacation, off, quarantine, sick, infected
    }]
  }, [])
}

export const getFilterOptions = (data: Data[], countries: FilterOption[]): Filter => {
  const filterOptions: Filter = {
    countries: [],
    companies: [],
    date: []
  }

  const createOption = (value: string | number, label?: string): FilterOption => ({ 
    label: label || value.toString(), 
    value
  })

  if (data[0]) {
    data[0].countries.forEach(el => filterOptions.countries.push(createOption(el.country)))
    data[0].companies.forEach(el => {
      if (countries.length <= 0) filterOptions.companies.push(createOption(el.company))
      else {
        const targetCountry = countries.find(c => c.value === el.country)
        if (targetCountry) filterOptions.companies.push(createOption(el.company))
      }
    })
    data.forEach(el => filterOptions.date.push(createOption(el.date, moment(el.date).format('DD-MM'))))
  }
  return filterOptions
}

export const getStats = (p: Data[]): Stats => {
  const output = {
    employees: 0,
    companies: 0,
    countries: 0,
    lastUpdate: '-'
  }
  const lastMeasure = p[p.length - 1]
  if (!lastMeasure) return output

  lastMeasure.companies.forEach(el => output.employees += el.employees)
  output.companies = lastMeasure.companies.length
  output.countries = lastMeasure.countries.length
  output.lastUpdate = moment(lastMeasure.date).format('DD-MM-YYYY')

  return output
}