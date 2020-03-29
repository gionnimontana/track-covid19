import { Data, AggregatedData } from '../Interfaces'
import moment from 'moment'

export const aggregateDate = (data: Data[]): AggregatedData[] => {
  return data.map((day) => {
    const date = moment(day.date).format('DD-MM')
    let factory = 0
    let home = 0
    let vacation = 0
    let off = 0
    let quarantine = 0
    let sick = 0
    let infected = 0
    day.companies.forEach(el => {
      factory += el.absData.people_factory
      home += el.absData.people_home
      vacation += el.absData.people_off
      off += el.absData.people_factory
      quarantine += el.absData.people_quarantine
      sick += el.absData.people_sick
      infected += el.absData.people_infected
    })
    return {
      date, factory, home, vacation, off, quarantine, sick, infected
    }
  })
}